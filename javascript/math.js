/*
    ========================================
    |    Number Grouping Function          |
    ========================================
*/
const num_group = ( num, size ) => {
    const ar_num = [];
    const str_num = num.toString();
    
    // Chech if amount of digits in number is odd or even
    if ( !!(str_num.length % size) ) {
        // Does NOT mod size
        let index = 0;
        ar_num[index] = '0';

        // Loop through digits
        for (let i = 0; i < str_num.length; i++) {
            // Check if index is even
            if ( !(i & 1) ) {
                // Concat digit to pair
                ar_num[index] += str_num[i];
                // Increment index
                index++;
            } else {
                // Add digit to array index
                ar_num[index] = str_num[i];
            }
        }
    } else {
        // Does mod size
        let index = 0;
        
        // Loop through digits
        for (let i = 0; i < str_num.length; i++) {
            // Check if index is odd
            if ( !!(i & 1) ) {
                // Concat digit to pair
                ar_num[index] += str_num[i];
                // Increment index
                index++;
            } else {
                // Add digit to array index
                ar_num[index] = str_num[i];
            }
        }
    }

    return ar_num;
}

/*
    ========================================
    |    Get Number Multiplier Function    |
    ========================================
*/
const get_multiplier = (num, prev_dig = '0') => {
    let mulitplier = multiplier_prev = 0;
    
    for ( let i = 1; i < 10; i++ ) {
        let dig = parseInt(prev_dig + i);
        if ( dig * i <= parseInt(num)) {
            mulitplier = i;
            multiplier_prev++;
        } else {
            mulitplier = multiplier_prev;
            break;
        }
    }

    return mulitplier;
}

/*
    ========================================
    |    Square Root Function              |
    ========================================
*/
const root = ( num, length = 10 ) => {
    const ar_num = num_group( num, 2 );
    const ar_sqrt = [];
    const orig_len = ar_num.length;
    let i = 0;
    let remainder = '';
    let decimal = false;
    let decimal_len = false;
    let num_len = length;

    // Loop through digit length after decimal 
    while ( i <= ar_sqrt.indexOf('.') + num_len ) {
        
        const prev_dig = ( isNaN( parseInt( ar_sqrt.join('') ) ) ) ? '0' : ( parseInt( ar_sqrt.join('') ) * 2 ).toString();
        const multiplier = get_multiplier( ar_num[i], prev_dig );
        remainder = (parseInt(ar_num[i]) - (parseInt(prev_dig + multiplier) * multiplier )).toString();
        ar_sqrt.push(multiplier.toString());
        
        const square = parseInt(ar_sqrt.join(''));

        if (square * square > num && decimal_len === false) {
            num_len += i;
            decimal_len = true;
        }

        if ( square * square === num ) { 
            break; 
        }

        if ( i >= orig_len - 1 ) {
            ar_num[i+1] = remainder + '00';
        } else {
            ar_num[i+1] = remainder + ar_num[i+1];
        }

        i++;
    }
    for (let i = 0; i < ar_sqrt.length; i++) {
        const array = [...ar_sqrt];
        const square = parseInt(array.slice(0,i).join(''));
        
        if ( square * square > num && !decimal) {
            const index = array.slice(0,i).length - 1;
            ar_sqrt.splice(index, 0, '.');
            
            decimal = true;
        }

    }
    
    const square = parseFloat(ar_sqrt.join(''));

    return square;
}

const num = 1024;

console.log(root(num, 10))