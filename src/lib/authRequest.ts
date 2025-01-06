import { LoginFormValues } from "@/types/LoginFormValues";
import { RegistrationFormValues } from "@/types/RegistrationFormValues";

function isRegistrationValues(object: LoginFormValues | RegistrationFormValues): object is RegistrationFormValues{
    return "passwordConfirmation" in object;
}
export function authRequest(data: LoginFormValues | RegistrationFormValues){
    if (isRegistrationValues(data)){
        //handle reg
    }

    //handle login
}
