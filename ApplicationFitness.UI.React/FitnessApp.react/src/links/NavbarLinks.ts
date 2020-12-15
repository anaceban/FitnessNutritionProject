import SignUp from '../Components/signup';
import SignInSide from '../Components/NewSighIn';
import CreateProfilePage from '../Components/ProfilePage';
import UserProgramSchedule from '../Components/UserProgramSchedule';
import HomePage from '../Components/HomePage';
import Advices from '../Components/Advices';
import Dish from '../Components/adminComponents/Dish';
import addDish from '../Components/adminComponents/AddDish';
import Users from '../Components/adminComponents/Users';
import Schedules from '../Components/adminComponents/Shedules';
import UpdateDish from '../Components/adminComponents/UpdateDish';
import AddProgram from '../Components/adminComponents/AddProgram';
import UpdateProgram from '../Components/adminComponents/UpdateProgram';
import Types from '../Components/adminComponents/Types';
import AddType from '../Components/adminComponents/AddType';
import UpdateType from '../Components/adminComponents/UpdateType';
import ScheduleInfo from '../Components/ScheduleInfo';
import AllReviews from '../Components/adminComponents/AllReviews';
import UpdateReview from '../Components/adminComponents/UpdateReview';
import AddNewDay from '../Components/AddNewDay';
import AddDishToDay from '../Components/adminComponents/AddDishToDay';
import AllProgramDays from '../Components/adminComponents/AllProgramDays';

export const paths = {
    SignUp: `/register`,
    SignIn: '/signin',
    Profile: '/profile',
    UserProgramSchedule: '/program',
    HomePage: '/home',
    Advices: '/advices',
    Page: '/page',
    AddDish: '/addDish',
    Dishes: '/dishes',
    Users: '/users',
    Programs: '/schedules',
    UpdateDish: '/updateDish',
    AddProgram: '/addProgram',
    UpdateProgram: '/updateProgram',
    Types: '/types',
    AddType: '/addType',
    UpdateType: '/updateType',
    GetProgramByType: '/typeProgram/:id',
    AllReviews: "/allReviews",
    UpdateReview:"/updateReview",
    AddNewDay: "/addDay",
    AddDishDay: "/addDishDay",
    Days: "/programDays"
}

export interface NavLinkProps {
    title: string,
    path: string,
    componentx: () => JSX.Element,
    isProtected?: boolean
}

export const navLinks = [
    { title: `Sign Up`, path: paths.SignUp, componentx: SignUp },
    { title: 'Sign In', path: paths.SignIn, componentx: SignInSide },
    { title: 'Program Schedule', path: paths.UserProgramSchedule, componentx: UserProgramSchedule, isProtected: true },
    { title: 'Advices', path: paths.Advices, componentx: Advices },
    { title: 'Profile', path: paths.Profile, componentx: CreateProfilePage, isProtected: true },
    { title: 'Dishes', path: paths.Dishes, componentx: Dish, isProtected: true },
    { title: 'AddDish', path: paths.AddDish, componentx: addDish, isProtected: true },
    { title: 'Users', path: paths.Users, componentx: Users, isProtected: true },
    { title: 'Programs', path: paths.Programs, componentx: Schedules, isProtected: true },
    { title: 'UpdateDish', path: paths.UpdateDish, componentx: UpdateDish, isProtected: true },
    { title: 'AddProgram', path: paths.AddProgram, componentx: AddProgram, isProtected: true },
    { title: 'UpdateProgram', path: paths.UpdateProgram, componentx: UpdateProgram, isProtected: true },
    { title: 'Types', path: paths.Types, componentx: Types, isProtected: true },
    { title: 'AddType', path: paths.AddType, componentx: AddType, isProtected: true },
    { title: 'UpdateType', path: paths.UpdateType, componentx: UpdateType, isProtected: true },
    { title: 'ScheduleInfo', path: paths.GetProgramByType, componentx: ScheduleInfo},
    { title: 'Reviews', path: paths.AllReviews, componentx: AllReviews, isProtected: true},
    { title: 'UpdateReview', path: paths.UpdateReview, componentx: UpdateReview, isProtected: true},
    { title: 'AddNewDay', path: paths.AddNewDay, componentx: AddNewDay, isProtected: true },
    { title: 'AddDishDay', path: paths.AddDishDay, componentx: AddDishToDay, isProtected: true },
    { title: 'ProgramDays', path: paths.Days, componentx: AllProgramDays, isProtected: true },

] as NavLinkProps[];
export const links = [
    { title: `Sign Up`, path: paths.SignUp, componentx: SignUp },
    { title: 'Sign In', path: paths.SignIn, componentx: SignInSide },
    { title: 'Advices', path: paths.Advices, componentx: Advices }
] as NavLinkProps[];
export const linksSide = [
    { title: `Sign Up`, path: paths.SignUp, componentx: SignUp },
    { title: 'Sign In', path: paths.SignIn, componentx: SignInSide },
    { title: 'Home Page', path: paths.HomePage, componentx: HomePage },
    { title: 'Advices', path: paths.Advices, componentx: Advices }
];
export const linksProfile = [
    { title: 'Advices', path: paths.Advices, componentx: Advices },
    { title: 'Schedule', path: paths.UserProgramSchedule, componentx: UserProgramSchedule, isProtected: true }
] as NavLinkProps[];

export const adminLinks = [
    { title: 'Dishes', path: paths.Dishes, componentx: Dish, isProtected: true },
    { title: 'Users', path: paths.Users, componentx: Users, isProtected: true },
    { title: 'Programs', path: paths.Programs, componentx: Schedules, isProtected: true },
    { title: 'Types', path: paths.Types, componentx: Types, isProtected: true },
    { title: 'Reviews', path: paths.AllReviews, componentx: AllReviews, isProtected: true},
    { title: 'Days', path: paths.Days, componentx: AllProgramDays, isProtected: true },
] as NavLinkProps[];