const findUsername = require('../findUsername')
const followData = (req, res, next) => {
    let arr = [];
    if (req.body.followerUsers) {
        await Promise.all(
            req.body.followerUsers.map(async (e) => {
                const users = await findUsername(e);
                users.map((i) => {
                    arr.push({
                        photo: i.photo,
                        bio: i.bio,
                        username: i.username,
                    });
                });
            })
        );
    } else {
        await Promise.all(
            req.body.followingUsers.map(async (e) => {
                const users = await findUsername(e);
                users.map((i) => {
                    arr.push({
                        photo: i.photo,
                        bio: i.bio,
                        username: i.username,
                    });
                });
            })
        );
    }
    res.send(arr);
}
module.exports = followData