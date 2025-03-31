"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUnfollowedUsersController = void 0;
const GetUnfollowedUserService_1 = require("../../services/follower/GetUnfollowedUserService");
class GetUnfollowedUsersController {
    async handle(req, res) {
        const loggedUserId = req.user_id;
        const service = new GetUnfollowedUserService_1.GetUnfollowedUsersService();
        const users = await service.execute(loggedUserId);
        return res.json(users);
    }
}
exports.GetUnfollowedUsersController = GetUnfollowedUsersController;
