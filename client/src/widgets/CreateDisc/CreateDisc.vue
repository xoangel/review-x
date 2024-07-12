<script setup lang="ts">
import { computed, nextTick, onMounted, Ref, ref, watch } from 'vue';
import uploadImages from '../../helpers/services/upload_image';
import { useDiscStore } from '../../helpers/stores/useDiscStore';
import ContentTypeAPI from '../../helpers/api/ContentTypeAPI';
import ActionButton from '../../ui/ActionButton/ActionButton.vue';
import IconContainer from '../../ui/icon/IconContainer.vue';
import { DiscAttributes } from '../../helpers/types/typeDisc';
import { ElLoading, ElNotification } from 'element-plus';
import isImageURL from "./../../helpers/services/is_image"

const discStore = useDiscStore();
const contentTypeAPIInstance = new ContentTypeAPI();

const artistInput = ref('');
const albumInput = ref('');
const releaseTypeInput = ref('');
const releaseTypeOptions = ['Альбом', 'Сингл'];
const releaseYearInput = ref('');
const releaseYearOptions = ref([]);
const albumCoverInput = ref('');
const genreInput = ref('');
const genreOptions = ref([]);
const moodInput = ref(5);
const moodInputInteger: Ref<number> = computed(()=>parseInt(moodInput.value.toFixed(0)));
const totalRateInput = ref(5);
const opinionInput = ref('');
let dialog = ref(null)
let melancholicIcon: Ref<Element | null> = ref(null);
let greatIcon: Ref<Element | null> = ref(null);

watch((discStore.getDiscToEdit as any ), ()=>{
    if (discStore.editMode && discStore.getDiscToEdit.value){
        const disc = discStore.getDiscToEdit.value.attributes;
        artistInput.value = disc.artist;
        albumInput.value = disc.title;
        if(disc.release_year) releaseYearInput.value = disc.release_year;
        if(disc.type) releaseTypeInput.value = disc.type;
        if(disc.cover_link) albumCoverInput.value = disc.cover_link;
        genreInput.value = disc.genre;
        moodInput.value = disc.dynamic_rate;
        totalRateInput.value = disc.total_rate;
        opinionInput.value = disc.description;
    }

});


function closeDialog(){
    if(discStore.editMode || discStore.discToEdit){
        discStore.editMode = false;
        discStore.discToEdit = null;
        artistInput.value = '';
        albumInput.value = '';
        releaseYearInput.value = '';
        releaseTypeInput.value = '';
        albumCoverInput.value = '';
        genreInput.value = '';
        moodInput.value = 5;
        totalRateInput.value = 5;
        opinionInput.value = '';
    }
}

onMounted(()=>{
    nextTick(() => {
        melancholicIcon = ref(document.querySelector('.melancholicIcon'));
        greatIcon = ref(document.querySelector('.greatIcon'));
    })
})

async function getAllGenres() {
    genreOptions.value = (await contentTypeAPIInstance.getGenres());
}

getAllGenres();

for(let i: number = new Date().getFullYear(); i >= 1800; i--){
    // @ts-expect-error
    releaseYearOptions.value.push(i.toString());
}

function changeMood(){
    (melancholicIcon.value as any).style.filter = `grayscale(${moodInputInteger.value/10}) drop-shadow(2px 2px 8px rgba(60, 121, 139, 0.${(10-moodInputInteger.value-0.6).toFixed(0)}))`;
    (greatIcon.value as any).style.filter = `grayscale(${(10 - moodInputInteger.value)/10}) drop-shadow(2px 2px 8px rgba(244, 211, 94, 0.${(moodInputInteger.value-0.6).toFixed(0)}))`;
};

async function submitCreation(){
    const loading = ElLoading.service({
        lock: false,
        text: 'Отправка на модерацию',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    let cursedImageUrl: boolean = false;
    
    try{
        if(albumCoverInput.value && !isImageURL(albumCoverInput.value)){
            ElNotification({
                title: 'Неверная ссылка',
                message: 'Указанная ссылка указывает не на картинку',
                type: 'error',
            });

            cursedImageUrl = true;
            return;
        }

        let coverURL: string = albumCoverInput.value;
        
        // try{
        //     const serverCoverEndpoint = await uploadImages(albumCoverInput.value);
        //     if (serverCoverEndpoint) coverURL = "http://localhost:1337".concat(serverCoverEndpoint);
        // } catch(e){
        //     console.error("Ошибка при получении обложки");
        // }

        const disc: DiscAttributes = {
            title: albumInput.value,
            artist: artistInput.value,
            release_year: releaseYearInput.value,
            total_rate: totalRateInput.value,
            dynamic_rate: parseInt(moodInput.value.toFixed()),
            genre: genreInput.value, 
            description: opinionInput.value,
            cover_link: coverURL,
            type: releaseTypeInput.value
        };

        if(discStore.editMode && discStore.discToEdit){
            await discStore.discAPIInstance.updateDisc(disc, discStore.discToEdit?.id);
        } else{
            await discStore.discAPIInstance.createDisc(disc);
        }

        ElNotification({
            title: 'Успешно',
            message: 'Диск отправлен на модерацию',
            type: 'success',
        });

    } catch(error){
        console.error(error);
        closeDialog();
        ElNotification({
            title: 'Возникла ошибка',
            message: 'Попробуйте позже',
            type: 'error',
        })
    } finally {
        if (!cursedImageUrl){
            closeDialog();
            discStore.createDiscVisibility = false;
        };
        loading.close();
    }
}

</script>

<template>
    <el-dialog 
    @close="closeDialog"
    ref="dialog"
    v-model="discStore.createDiscVisibility"
    width="960"
    >
    <div class="create_disc_popup">
        <h1 class="create_disc_popup__title"> Создать диск </h1>
        <form @submit.prevent="submitCreation" class="create_disc_popup__inputs">
            <div class="create_disc_popup__line create_disc_popup__line-fl">
                <div class="create_disc_popup__input_group">
                    <label for="artist_input">Артист</label>
                    <el-input
                        v-model="artistInput"
                        id="artist_input"
                        style="width: 100%"
                        :maxlength="50"
                        name="artist_input"
                        clearable
                        required
                    />
                </div>
                <div class="create_disc_popup__input_group">
                    <label for="album_input">Название диска</label>
                    <el-input
                        v-model="albumInput"
                        id="album_input"
                        style="width: 100%"
                        :maxlength="50"
                        name="album_input"
                        clearable
                        required
                    />
                </div>
            </div>
            <div class="create_disc_popup__line create_disc_popup__line-sl">
                <div class="create_disc_popup__input_group">
                    <label for="cover_link_input">Ссылка на обложку</label>
                    <el-input
                        v-model="albumCoverInput"
                        style="width: 100%"
                        id="cover_link_input"
                        :maxlength="200"
                        name="cover_link_input"
                        placeholder="https://..."
                        clearable
                    />
                </div>
            </div>
            <div class="create_disc_popup__line create_disc_popup__line-tl">
                <div class="create_disc_popup__input_group">
                    <!-- <label for="release_year_input">Год релиза</label> -->
                    <el-select
                        v-model="releaseTypeInput"
                        clearable
                        placeholder="Тип релиза"
                        style="width: 100%"
                        required
                    >
                        <el-option
                        v-for="item in releaseTypeOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                        />
                    </el-select>
                </div>
                <div class="create_disc_popup__input_group">
                    <!-- <label for="release_year_input">Год релиза</label> -->
                    <el-select
                        v-model="genreInput"
                        clearable
                        placeholder="Жанр"
                        style="width: 100%"
                        required
                    >
                        <el-option
                        v-for="item in genreOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                        />
                    </el-select>
                </div>
                <div class="create_disc_popup__input_group">
                    <!-- <label for="release_year_input">Год релиза</label> -->
                    <el-select
                        v-model="releaseYearInput"
                        clearable
                        placeholder="Год релиза"
                        style="width: 100%"
                    >
                        <el-option
                        v-for="item in releaseYearOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                        />
                    </el-select>
                </div>
            </div>
            <div class="create_disc_popup__line create_disc_popup__line-frl">
                <div class="create_disc_popup__input_group">
                    <label for="dynamic_input">Динамика</label>
                    <div class="create_disc_popup__select_group">
                        <img class="icon melancholicIcon" ref="melancholicIcon" src="/icons/melancholic_disc.svg">
                        <el-slider 
                            v-model="moodInput"
                            id="dynamic_input" 
                            :min="0"
                            :max="10"
                            :step="0.1"
                            :show-tooltip="false" 
                            @change="changeMood"
                            required
                        />
                        <img class="icon greatIcon" ref="greatIcon" src="/icons/great_disc.svg">
                    </div>
                </div>
            </div>
            <!-- <div class="create_disc_popup__line create_disc_popup__line-fvl">
                <div class="create_disc_popup__input_group">
                    <h2>Общая оценка</h2>
                    <el-input-number
                        v-model="totalRateInput"
                        :min="1"
                        :max="10"
                        controls-position="right"
                        size="large"
                        required
                    />
                </div>
            </div> -->
            <div class="create_disc_popup__line create_disc_popup__line-sxl">
                <div class="create_disc_popup__input_group">
                    <label for="release_year_input">Мнение</label>
                    <el-input
                        v-model="opinionInput"
                        style="width: 100%"
                        :rows="6"
                        resize="none"
                        type="textarea"
                    />
                </div>
                <div class="create_disc_popup__input_group">
                    <h2>Общая оценка</h2>
                    <el-input-number
                        v-model="totalRateInput"
                        :min="1"
                        :max="10"
                        controls-position="right"
                        size="large"
                        required
                    />
                </div>
            </div>
            <ActionButton :submit="true"><IconContainer :src="'/icons/flash.svg'"/><p>Создать</p></ActionButton>
        </form>
    </div>
    
    </el-dialog>
</template>

<style lang="scss">
@import "./CreateDisc.scss";
</style>