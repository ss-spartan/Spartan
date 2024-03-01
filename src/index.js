import { SpartanClient } from './util/Spartan';

const Spartan = new SpartanClient();

try {
    Spartan.login(process.env.TOKEN)
} catch (err) {
    console.log(err);
}