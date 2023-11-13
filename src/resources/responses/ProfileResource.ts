export interface ProfileResource {
    id: number;
    name: string;
    last_name: string;
    birth_date: Date;
    district: string;
    region: string;
    created_at: Date;
    user_id: number;
}