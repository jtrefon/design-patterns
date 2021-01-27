// Simple Interface
interface IUser {
    username: string;
    password: string;
}
// Interface Segregation rule from sol[I]d
interface IUserRemember extends IUser {
    remember: boolean
}
// model implementation 
class User implements IUser{
    username: string;
    password: string;
}
class UserRemember extends User implements IUser {
    remember: boolean;
}

const user = new User();
// abstraction creation from dependency Inversion soli[D]
interface IUserAuth {
    Authenticate(username: string, password: string): boolean;
}
interface IUserAuthRemember extends IUserAuth {
    setIsRemembered(remember: boolean): void;
    getIsRemembered(): boolean;
}
// Single responsibility
class UserAuth implements IUserAuth {
    private user: IUser;
    constructor(_user: IUser) {
        this.user = _user;
    }
    Authenticate(): boolean {
        if (this.user.username && this.user.password) return true;
        false;
    }
}
// composition, dependency inversion and Single responsibility
class UserAuthRemember implements IUserAuthRemember {
    private userRemember: IUserRemember;
    private auth: IUserAuth;
    constructor(_user: IUserRemember, _auth: IUserAuth) {
        this.userRemember = _user;
        this.auth = _auth;
    }

    setIsRemembered(remember: boolean): void {
        this.userRemember.remember = remember;
    }
    Authenticate(username: string, password: string): boolean {
        return this.auth.Authenticate(username, password);
    }

    getIsRemembered(): boolean {
        return this.userRemember.remember;
    }
}



// unit testing scenario 1: 

const userObject: IUser = new User(); 

userObject.username = "some random user",
userObject.password = "some random password"

const userAuthObject = new UserAuth(userObject);
userAuthObject.Authenticate() ? console.log("success") : console.log("failed");

// unit testing scenario 2
const userRemembered: IUserRemember = new UserRemember();


const userAuthObjMock: IUserAuth = {
    Authenticate: () => { return true }
}
const userRememberClass: IUserAuthRemember = new UserAuthRemember(userRemembered, userAuthObjMock);
userRememberClass.setIsRemembered(true);
userRememberClass.getIsRemembered ? console.log("success") : console.log("failure");
