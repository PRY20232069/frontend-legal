export interface IDocument {
    id: number;
    title: string;
    uploaded_date: string;
    num_pages?: number;
    num_observations: number;
    favorite: boolean;
}