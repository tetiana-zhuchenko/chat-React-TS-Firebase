import { MessageType } from '../components/Messages'

function formateDate(message: MessageType): string {
  const dateObject = new Date(message.date.seconds * 1000) // Convert seconds to milliseconds
  const hours = String(dateObject.getHours()).padStart(2, '0') // Get hours (padded with zero if needed)
  const minutes = String(dateObject.getMinutes()).padStart(2, '0') // Get minutes (padded with zero if needed)
  const day = String(dateObject.getDate()).padStart(2, '0') // Get day of the month (padded with zero if needed)
  const month = String(dateObject.getMonth() + 1).padStart(2, '0') // Get month (add 1 because months are zero-based)
  const year = dateObject.getFullYear() // Get full year

  return `${hours}:${minutes} ${day}.${month}.${year}`
}

export default formateDate
