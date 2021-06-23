/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 01/06/2021 - 17:42:14
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
const Team = require('../team.model');

const { teamName: teamNameValidation } = require('../team.validation');

async function updateName(req, res, next) {
	try {
		const { error, value } = teamNameValidation.validate(req.body);
		if (error) return res.status(400).json({ message: error.message.replace(/"/g, '') });

		const team = await Team.findById(req.userData._id);
		if (!team) return res.status(401).send({ message: 'Unauthorized team not exists' });

		let teamNameExists = await Team.findOne({ name: value.name, _id: { $ne: req.userData._id } });
		if (teamNameExists) return res.status(409).json({ message: 'This team name used before..' });

		team.name = value.name;
		await team.save();
		return res.status(200).send({ message: 'Team name updated successfully' });
	} catch (error) {
		return res.status(500).send({ message: 'Internal server error' });
	}
}

module.exports = updateName;
