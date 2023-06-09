import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

// TODO Replace with actual view
const registerTemplete = (onRegister) => html`
  <h1>Register Page</h1>
  <section id="registerPage">
    <form @submit=${onRegister}>
      <fieldset>
        <legend>Register</legend>

        <label for="email" class="vhide">Email</label>
        <input
          id="email"
          class="email"
          name="email"
          type="text"
          placeholder="Email"
        />

        <label for="password" class="vhide">Password</label>
        <input
          id="password"
          class="password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <label for="conf-pass" class="vhide">Confirm Password:</label>
        <input
          id="conf-pass"
          class="conf-pass"
          name="conf-pass"
          type="password"
          placeholder="Confirm Password"
        />

        <button type="submit" class="register">Register</button>

        <p class="field">
          <span>If you already have profile click <a href="/login">here</a></span>
        </p>
      </fieldset>
    </form>
  </section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplete(createSubmitHandler(onRegister)));

  async function onRegister({ email, password,"conf-pass": repass }, form) {
    if (email == "" || password == "") {
      return alert("All fieald are requires");
    }
    if (password != repass) {
      return alert("Password don't match");
    }
    await register(email, password);
    form.reset();
    ctx.page.redirect("/");
  }
}
