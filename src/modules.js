
// const valuesFilterRecursion = (squerValues, combination, winningPoints) => {
//     let winningPointsCopy = winningPoints
//     if (squerValues.length >= 1) {
//         const restValues = [...squerValues]
//         const i = restValues[0]

//         if(combination.includes(i)) {
//             restValues.splice(0,1)
//             winningPointsCopy += 1

//             if (winningPointsCopy === 3) {
//                 return winningPointsCopy
//             } else if ( winningPointsCopy > 3 ) {
//                 throw Error('Something wrong with your code, brother')
//             }

//             return valuesFilterRecursion(restValues, combination, winningPointsCopy)
//         } else {
//             winningPointsCopy = winningPoints

//             return winningPointsCopy
//         }
//     }

//     return winningPointsCopy

// }

const valuesFilterRecursion = (squerValues, combination) => {

    for (const i of combination) {
        if (squerValues.includes(i)) {
            continue
        } else {
            return false
        }
    }

    return true
}

export const searchingForWinner = (squerValues, combinations, turnFor) => {
    for (const combination of combinations) {
        const isAWin = valuesFilterRecursion(squerValues, combination)
        
        if (isAWin) {
            return [isAWin, turnFor]
        }
    }

    return [false, turnFor]
}