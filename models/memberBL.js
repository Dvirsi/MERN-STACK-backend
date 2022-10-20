const { Member } = require('./schema')
const { deleteAllSubsByMemberId } = require('./subsciptionBL')

const getAllMembers = () => {
    try {
        return Member.find({});
    } catch(error) {
        throw Error(error)
    }
}

const addMember = async (obj) => {
    const exists = await Member.findOne({ fullname: obj.fullname });
        if (exists) {
        throw Error('Member already exists');
    }
    const member = new Member({
        fullname: obj.fullname,
        email: obj.email,
        city: obj.city
    })
    try {
        const newMember = await member.save();
        return newMember
    } catch(error) {
        throw Error(error)
    }
}

const deleteMember = async (id) => {
    try {
        await deleteAllSubsByMemberId(id)
        await Member.findByIdAndDelete(id)
    } catch(error) {
        throw Error(error)
    }
}


const updateMember = async (id, member) => {
    await Member.findByIdAndUpdate(id, {
        email: member.email,
        city: member.city,
        fullname: member.fullname,
    })
    const updatedMember = await Member.findById(id)
    return updatedMember
}

module.exports = { getAllMembers, addMember, deleteMember, updateMember }