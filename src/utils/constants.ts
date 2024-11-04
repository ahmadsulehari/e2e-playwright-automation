import * as path from "node:path";

export enum CandidateDetails {
    Address = 'Str. 3, 50700 Gujrat, Pakistan',
    CVTitle = 'jobcv.pdf',
    City = 'Gujrat',
    Degree = 'Bachelors',
    FirstName = 'IHTSHAM',
    Gender = 'Male',
    Graduation = 'Oct 2024',
    LastName = 'Mir',
    Major = 'Computer Science',
    Phone = '03461716816',
    ReferralEmail = 'hirestream.autoamtion@gmail.com',
    Skill = 'javascript',
    Source = 'Referral',
    SuccessMsg = 'Candidate added successfully',
}

export enum CandidateSourceType {
    Other = 'other',
    Referral = 'referral',
}

export enum DropDownListIndex {
    MaleGender = 0,
    Skill = 1,
}

export enum JobsPageStatus {
    JobStatusPublish = 'publish',
}

export enum UrlPaths {
    CandidatePagePath = 'apply/jobs',
    Login = '/login',
    Jobs = '/jobs',
    ViewJobPath = 'view-job',
}

export const apiEndPoints = {
    createNewJob: '/api/v1/jobs/',
    login: '/api/v1/users/login/'
}

export const authFile = path.join(__dirname, '../../playwright/.auth/user.json');