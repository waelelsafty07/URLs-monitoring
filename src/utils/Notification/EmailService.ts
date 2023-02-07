import transporter from '../../emailConfig';
import NotifyService from './NotifyService';
import optInterface from './optInterface';



class EmailService extends NotifyService {
    mailOpts: optInterface;
    constructor(mailOpts: optInterface) {
        super();
        this.mailOpts = {
            from: mailOpts.from,
            to: mailOpts.to,
            subject: mailOpts.subject,
            html: mailOpts.html,
        };
    }

    public override async Send() {
        transporter.sendMail(this.mailOpts);
    }
}
export default EmailService