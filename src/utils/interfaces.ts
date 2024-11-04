export default interface EnvVar {
    USERNAME: string;
    PASSWORD: string;
    BASE_URL: string;
}

export interface newJobResponse {
    cover_image_path: string;
    created_by: number;
    department: number;
    description: string;
    hiring_members: Record<string, string | number | boolean>[];
    id: number;
    is_active: boolean;
    is_remote: boolean;
    job_auto_email: null;
    job_limit_reached: boolean;
    job_requirements: Record<string, number | string | boolean>[];
    job_status: string;
    location: number;
    note_template: Record<string, string>[];
    online_test_duration: null;
    online_test_end_time: null;
    online_test_max_attempts: null;
    online_test_randomize: null;
    online_test_show_answer: null;
    online_test_start_time: null;
    online_test_title: null;
    positions: number;
    post_to_job_target: boolean;
    priority: number;
    title: string;
    uuid: string;
    workflow: number;
}

export interface UserData {
    refresh: string;
    access: string;
    is_candidate: boolean;
    permissions: {
        is_super_admin: boolean;
        is_recruiter: boolean;
        is_reviewer_interviewer: boolean;
        is_super_reviewer: boolean;
        has_interviews: boolean;
        has_referrals: boolean;
        has_reviews: boolean;
        has_reference_checks: boolean;
        is_candidate: boolean;
        is_verified: boolean;
        organization_valid: boolean;
        is_new_user: boolean;
        has_requisitions: boolean;
        is_reviewer_interviewer_only: boolean;
    };
    reactivating: boolean;
}