export default interface CreatePage {
    yearOfBirth: Number
    weight: Number,
    height: Number,
    gender: string,
    primaryGoal: string,
    levelOfFitnessExperience: string,
    typeName: string
}
export enum Gender {
    Male = 'male',
    Female = 'female'
}

export enum PrimaryGoal {
    Slimming = 'slimming',
    GainingMuscles = 'gaining-muscles',
    HealthyHabits = 'healthy-habits'
}

export enum ExperienceLevel {
    Begginer = 'begginer',
    Middle = 'middle',
    Advanced = 'advanced'
}