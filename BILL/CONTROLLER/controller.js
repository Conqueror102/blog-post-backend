const billModel = require("../MODEL/model");

const createBill = async (req, res) => {
    try {
        const { billName, totalAmount, participants } = req.body;

        const shareAmount = (totalAmount, participants) => {
            if (participants.length === 0) return [];

            const sharePerPerson = Number((totalAmount / participants.length).toFixed(2));
            return participants.map(p => ({
                ...p,
                amountOwed: sharePerPerson,
                amountPaid: p.amountPaid ?? 0
            }));
        };

        const updateParticipants = shareAmount(totalAmount, participants);

        const postBill = await billModel.create({
            billName,
            totalAmount,
            participants: updateParticipants
        });
        return res.status(201).json({ message: "Bill posted successfully", data: postBill });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const findBill = await billModel.find();
        return res.status(200).json({ data: findBill });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const findOne = await billModel.findById(id);
        if (!findOne) {
            return res.status(404).json({ message: "Bill not found" });
        }
        return res.status(200).json({ data: findOne });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateBill = async (req, res) => {
    const { billId, parId } = req.params;
    const { billName, totalAmount, participant } = req.body;
    try {
        const bill = await billModel.findById(billId);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        if (billName) bill.billName = billName;
        if (totalAmount) bill.totalAmount = totalAmount;

        if (parId && participant) {
            const { name, amountOwed, amountPaid } = participant;
            const participantToUpdate = bill.participants.id(parId);

            if (!participantToUpdate) {
                return res.status(404).json({ message: "Participant not found" });
            }

            if (name) participantToUpdate.name = name;
            if (amountOwed) participantToUpdate.amountOwed = amountOwed;
            if (amountPaid) participantToUpdate.amountPaid = amountPaid;
        }
        await bill.save();
        return res.status(200).json({ message: "Successfully updated", bill });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteBill = async (req, res) => {
    try {
        const { billId } = req.body;
        const deleteBill = await billModel.findByIdAndDelete(billId);
        if (!deleteBill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const everyoneDept = async (req, res) => {
    const { billId } = req.params;
    try {
        const bill = await billModel.findById(billId);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        const amountOwed = bill.participants.map(p => ({
            name: p.name,
            amountOwed: (p.amountOwed - p.amountPaid).toFixed(2)
        }));
        return res.status(200).json({ data: amountOwed });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const paidComplete = async (req, res) => {
    try {
        const { billId } = req.params;
        const bill = await billModel.findById(billId);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        const paidFull = bill.participants.filter(p => p.amountPaid >= p.amountOwed)
            .map(p => p.name);
        return res.status(200).json({ data: paidFull });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const findHighestPaid = async (req, res) => {
    try {
        const { billId } = req.params;
        const bill = await billModel.findById(billId);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        const whoPaidMost = bill.participants.reduce((max, par) => par.amountPaid > max.amountPaid ? par : max, { amountPaid: 0 });
        return res.status(200).json({ name: whoPaidMost.name, amountPaid: whoPaidMost.amountPaid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const totalAmountPaid = async (req, res) => {
    try {
        const { billId } = req.params;
        const bill = await billModel.findById(billId);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        const totalPaid = bill.participants.reduce((s, p) => s + p.amountPaid, 0);
        return res.status(200).json({ totalPaid: totalPaid.toFixed(2) });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createBill,
    getAll,
    findOne,
    updateBill,
    deleteBill,
    everyoneDept,
    paidComplete,
    findHighestPaid,
    totalAmountPaid
};