const minutesFromTimeString = (time: string): number => {
    const hours = +time.split(':')[0]
    const minutes = +time.split(':')[1]
    return (hours * 60) + minutes;
}

const compareTime = (time: string, date: string) => {
    const hours = +time.split(':')[0]
    const minutes = +time.split(':')[1]
    const sum = (hours * 60) + minutes;

    console.log(new Date(date).setMinutes( new Date(date).getMinutes() + sum), "compares");
    

    return new Date(date).setMinutes( new Date(date).getMinutes() + sum);
}


export default {
    getAvailableSlots(arrOfSchedules: any[]) {
        const futureSchedules = arrOfSchedules.filter((i: any) => new Date(i.startDate) > new Date(Date.now()));
        
        futureSchedules.map((i: any) => {
            i.fullStartDate = new Date(new Date(i.startDate).setMinutes((new Date(i.startDate).getMinutes() + minutesFromTimeString(i.startTime)))).toLocaleString()
            i.fullEndDate = new Date(new Date(i.endDate).setMinutes((new Date(i.endDate).getMinutes() + minutesFromTimeString(i.endTime)))).toLocaleString()
            return i;
        });
        
        const arrOfSlots : any = [ ];
        let streak = true;
        let count = 0;
        futureSchedules.forEach((i: any) => {
            streak = true;
            while(streak) {
                const slotStart = new Date(i.fullStartDate).setMinutes(new Date(i.startDate).getMinutes() + (i.slotSize * count));
                const slotEnd = new Date(slotStart).setMinutes(new Date(i.startDate).getMinutes() + (i.slotSize * (count + 1)));

                
                if (new Date(slotEnd).toLocaleString() < new Date(i.fullEndDate).toLocaleString() || new Date(slotEnd).toLocaleString() === new Date(i.fullEndDate).toLocaleString()) {
                    const index = i.breaks.findIndex((x: any) => (compareTime(x.startTime, i.startDate) >= compareTime(i.startTime, i.startDate)) && (compareTime(x.endTime, x.endDate) <= compareTime(i.endTime, i.endDate)))
                    const indx = i.slots.findIndex((y: any) => (compareTime(y.startTime, i.startDate) >= compareTime(i.startTime, i.startDate)) && (compareTime(y.endTime, y.endDate) <= compareTime(i.endTime, i.endDate)))
                    
                    
                    if (index < 0 && indx < 0) {
                        arrOfSlots.push({ start: new Date(slotStart).toLocaleString(), end: new Date(slotEnd).toLocaleString() })
                    }
                } else {
                    streak = false;
                }
                count += 1;
            }
        });
        console.log(arrOfSlots, "SLOTS");
        return arrOfSlots;
    }
}