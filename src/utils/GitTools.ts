import Account from './Account';

export default class GitTools {
  public static commitOneUser(newAccount: Account, callback: (err?: string) => void): void {
    newAccount.clone((cloneErr) => {
      if (cloneErr) {
        callback(cloneErr);
      } else {
        console.log('cloned');
        newAccount.alterFile((alterErr) => {
          if (alterErr) {
            callback(alterErr);
          } else {
            console.log('altered file');
            newAccount.stage((stageErr) => {
              if (stageErr) {
                callback(stageErr);
              } else {
                console.log('staged');
                newAccount.commit((commitErr) => {
                  if (commitErr) {
                    callback(commitErr);
                  } else {
                    console.log('committed');
                    newAccount.push((pushErr) => {
                      if (commitErr) {
                        callback(commitErr);
                      } else {
                        console.log('pushed');
                        newAccount.removeRepo((removeErr) => {
                          if (removeErr) {
                            callback(removeErr);
                          } else {
                            console.log('removed repo');
                            callback();
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
}
