import * as Permissions from 'expo-permissions';

export const verifyPermissions = async (permissions, failCallback) => {
    
    const result = await Permissions.askAsync(... permissions);

    if(result.status !== 'granted') {

        if(failCallback) {
            failCallback();
        }
        
        return false;
    };

    return true;
};