import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';


@Injectable()
export class EmailProvider {

   constructor(private _EMAIL   : EmailComposer)
   { }




   /**
    *
    * @public
    * @method sendMail
    *
    */
   sendEmail() : void
   {
      // Use the plugin isAvailable method to check whether
      // the user has configured an email account
      this._EMAIL.isAvailable()
      .then((available: boolean) =>
      {

         // Check that plugin has been granted access permissions to
         // user's e-mail account
         this._EMAIL.hasPermission()
         .then((isPermitted : boolean) =>
         {

            // Define an object containing the
            // keys/values for populating the device
            // default mail fields when a new message
            // is created
            let email : any = {
               app 			: 'gmail',
               to 			: 'ajlabecic26@gmail.com',
               cc 			: '',
               bcc 			: '',
               attachments 	: [ ],
               subject 		: 'hej cao',
               body 		: 'tekstteks'
            };

            // Open the device e-mail client and create
            // a new e-mail message populated with the
            // object containing our message data
            this._EMAIL.open(email);
         })
         .catch((error : any) =>
         {
         });
      })
      .catch((error : any) =>
      {
      });
   }

}