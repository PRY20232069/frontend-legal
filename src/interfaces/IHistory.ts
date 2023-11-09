export interface IDocument {
    id: number;
    title: string;
    uploaded_date: Date;
    num_pages?: number;
    num_observations: number;
    favorite: boolean;
}