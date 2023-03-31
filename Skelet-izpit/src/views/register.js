import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


// TODO Replace with actual view
const registerTemplete = (onregister) => html`
<h1>Register Page</h1>
<form @submit=${onregister}>
      <label>Email: <input type="text" name="email"></label>
      <label>Password: <input type="password" name="password"></label>
      <label>:Repeat <input type="password" name="repass"></label>

       <button>register</button>
</form>`;

export function registerPage(ctx) {
    ctx.render(registerTemplete(createSubmitHandler(onRegister)));
    
    // TODO change user object based on requirements
    async function onRegister({email, password, repass},form) {
        if(email == ''|| password == ''){
            return alert('All fieald are requires');
        }
        if(password != repass){
            return alert('Password don\'t match');

        }
        await register(email,password);
        form.reset();
        //TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}