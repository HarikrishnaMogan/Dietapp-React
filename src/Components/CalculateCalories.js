
function CalcCalories(values)
{
    if(values.gender==="male")
    {
        let bmr = Math.trunc(66.5+(13.76*values.weight)+(5.003*values.height)-(6.755*values.age));
        let diffInWeight = values.weight-values.targetWeight;
        //if diffinweight less han zero that means user has to gain weight
        if(diffInWeight<0)
        {
             return (bmr*values.activityFactor +500);
        }
        else{
            return (bmr*values.activityFactor-500);
        }
    }
    else
    {
        let bmr = Math.trunc(655+(9.563*values.weight)+(1.850*values.height)-(4.676*values.age));
        let diffInWeight = values.weight-values.targetWeight;
        if(diffInWeight<0)
        {
             return (bmr*values.activityFactor+500);
        }
        else{
            return (bmr*values.activityFactor-500);
        }
        
    }
}

export default CalcCalories;