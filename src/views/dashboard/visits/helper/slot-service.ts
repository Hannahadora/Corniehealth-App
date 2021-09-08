const minutesFromTimeString = (time: string): number => {
    const hours = +time.split(':')[0]
    const minutes = +time.split(':')[1]
    return (hours * 60) + minutes;
}

const compareTime = (time: string, date: string) => {
    const hours = +time.split(':')[0]
    const minutes = +time.split(':')[1]
    const sum = (hours * 60) + minutes;    

    return new Date(date).setMinutes( new Date(date).getMinutes() + sum);
}


export default {
    getAvailableSlots(arrOfSchedules: any[]) {
        // const futureSchedules = arrOfSchedules.filter((i: any) => new Date(i.startDate) > new Date(Date.now()));
        console.log(arrOfSchedules, "arrs");
        
        const futureSchedules = arrOfSchedules.map((i: any) => {
            i.fullStartDate = new Date(new Date(new Date(i.startDate).toISOString()).setMinutes((new Date(i.startDate).getMinutes() + minutesFromTimeString(i.startTime)))).toISOString()
            i.fullEndDate = new Date(new Date(new Date(i.endDate).toISOString()).setMinutes((new Date(i.endDate).getMinutes() + minutesFromTimeString(i.endTime)))).toISOString()
            return i;
        });        
        
        const arrOfSlots : any = [ ];
        let streak = true;
        let count = 0;
        futureSchedules.forEach((i: any) => {
            streak = true;
            while(streak) {
                const slotStart = new Date(i.fullStartDate).setMinutes(new Date(i.startDate).getMinutes() + ((i.slotSize + (count > 0 ? 5 : 0)) * count));
                const slotEnd = new Date(slotStart).setMinutes(new Date(slotStart).getMinutes() + i.slotSize);
               

                
                if (new Date(slotEnd).toLocaleString() < new Date(i.fullEndDate).toLocaleString() || new Date(slotEnd).toLocaleString() === new Date(i.fullEndDate).toLocaleString()) {
                    const index = i.breaks.findIndex((x: any) => (compareTime(x.startTime, i.startDate) >= compareTime(i.startTime, i.startDate)) && (compareTime(x.endTime, x.endDate) <= compareTime(i.endTime, i.endDate)))
                    const indx = i.slots.findIndex((y: any) => (compareTime(y.startTime, i.startDate) >= compareTime(i.startTime, i.startDate)) && (compareTime(y.endTime, y.endDate) <= compareTime(i.endTime, i.endDate)))
                    
                    
                    if (index < 0 && indx < 0) {
                        const startTime = new Date(slotStart).toLocaleTimeString('en',
                            { hour12: false, timeZone: 'UTC' });
                        const endTime = new Date(slotEnd).toLocaleTimeString('en',
                            { hour12: false, timeZone: 'UTC' });

                        arrOfSlots.push({ start: startTime.substring(0, 5), end: endTime.substring(0, 5) })
                        // arrOfSlots.push({ start: new Date(slotStart).toISOString(), end: new Date(new Date(slotEnd).toISOString()).toTimeString().substring(0, 5) })
                        
                    }
                } else {
                    streak = false;
                }
                count += 1;
            }
            
        });
        console.log(arrOfSlots, "SLOTS");
        return arrOfSlots;
    },

    matchDates(date1: string, date2: string) {
        const result = new Date(date1).getDay() === new Date(date2).getDay() && new Date(date1).getMonth() === new Date(date2).getMonth() && new Date(date1).getFullYear() === new Date(date2).getFullYear()
        return result;
        
    }
}