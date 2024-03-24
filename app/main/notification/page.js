// "use server"
import React from 'react'
import { roleCheck } from '@/service/worker'
import RecruiterNotification from './recruiter/recruiter'
import WorkerNotification from './worker/worker'
export const dynamic ="force-dynamic"
const Notificaion = async() => {
    const role =  await roleCheck()
  return (
    <div>
{role === "recruiter" ? <RecruiterNotification/> : <WorkerNotification />}
    </div>
  )
}

export default Notificaion