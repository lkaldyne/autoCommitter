import Account from "./Account";

export default class GitTools {
    public static commitOneUser(newAccount: Account, callback: () => void): void {
        newAccount.clone(() => {
            newAccount.alterFile(() => {
                newAccount.stage(() => {
                    newAccount.commit(() => {
                        console.log("committed");
                        newAccount.push(() => {
                            console.log("pushed");
                            newAccount.removeRepo(() => {
                                console.log("removed repo");
                                callback();
                            })
                        }, callback);
                    }, callback);
                }, callback);
            }, callback);    
        }, callback);

    }
}
