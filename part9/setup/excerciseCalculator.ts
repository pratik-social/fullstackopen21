interface Result {
    periodLength: number,
    trainingDays: number,
    sucess: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface excerciseValue {
    value1: Array<number>,
    value2: number
}

function arguments(args: Array<string>): excerciseValue {
    let array: Array<number> = []
    let target
    if (args.length < 4) {
        throw new Error("Not Enough arguement")
    }
    args.forEach((value) => {
        if (!isNaN(Number(value))) {
            array.push(Number(value))
        }
    })

    target = array.shift()
    if (array.length === 0) {
        throw new Error('Invalid Arguments')
    }
    return { value1: array, value2: target }
}


function calculateExcercises(daily: Array<number>, target: number): Result {
    const arr: Array<Number> = []
    daily.forEach((arrayValue) => arrayValue === 0 ? null : arr.push(arrayValue))
    let sum: number = 0;
    daily.forEach((arrayValue) => {
        return sum += arrayValue

    })
    const average = sum / daily.length
    let rating, sucess;
    if (average < target) {
        sucess = false;
        rating = Math.floor(Math.random() * 10 - 5) > 0 ? 1 : 2
    } else {
        sucess = true;
        rating = 3
    }

    let ratingDescription;
    switch (rating) {
        case 1:
            ratingDescription = "very bad, improvement"
            break;
        case 2:
            ratingDescription = "not too bad but could be better"
            break;
        case 3:
            ratingDescription = "very Nice, appreciating hardwork"
            break;
        default:
            break;
    }

    return {
        periodLength: daily.length,
        trainingDays: arr.length,
        sucess,
        rating,
        ratingDescription,
        target,
        average
    }
}




try {
    const { value1, value2 } = arguments(process.argv)
    console.log(calculateExcercises(value1, value2))
} catch (error) {
    let errorMessage = "Something Bad Happened"
    if (error instanceof Error) {
        errorMessage += ' Error ' + error.message
    }
    throw new Error(errorMessage);
}