import { DateTime } from 'luxon'


const currentDate = DateTime.now().setLocale('br')

export default (payment) => {

    let invoiceDueDates = []

    payment == 0 ? invoiceDueDates = [currentDate.plus({ days: payment * 30 }).toLocaleString()] : invoiceDueDates

    function generateDates(pmt) {
        return currentDate.plus({ days: pmt * 30 }).toLocaleString()
    }

    for (let i = 1; i <= payment; i++) {
        invoiceDueDates = [...invoiceDueDates, generateDates(i)]
    }

    return invoiceDueDates

}