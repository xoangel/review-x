export default interface IDisc{
    id: number;
    attributes: {
        title: string;
        artist: string;
        release_year: string;
        total_rate: number;
        genre: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        cover_link: string;
    };
}