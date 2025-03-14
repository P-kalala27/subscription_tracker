import request from "supertest";
import UserModels from "../models/User.models";
import test, { afterEach, describe } from "node:test";


describe('auth routes', () => {
    afterEach(async () =>{
        await UserModels.deleteMany({});
    })
})

//Test de la création d'un utilisateur
test()