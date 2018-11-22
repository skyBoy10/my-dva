export const formatGender = gender => {
    switch(gender) {
        case 1:
        case '1':
            return '男';
        case 2:
        case '2':
            return '女';
        default: 
            return '未知';
    }
}