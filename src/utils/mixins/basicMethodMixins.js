import iziToast from "izitoast";
export default {
    methods: {
        getCountryTel(dial_code, phone){
            if(phone[0] !== '+'){
                if(phone[0] === '0'){
                    let _phone = phone.split("").reverse();
                    _phone.pop();
                    phone = _phone.reverse().join("")
                }
                return `+${dial_code}${phone}`
            }
            return phone
        },
        getReadableDate(store_timestamp){
            if(store_timestamp){
                let _date = new Date(0);
                _date.setSeconds(store_timestamp.seconds);
                if(_date.getTime() === _date.getTime())
                    return _date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }
            return 'No Date'
        },
        getReadableTime(store_timestamp){
            if(store_timestamp){
                let _date = new Date(0);
                _date.setSeconds(store_timestamp.seconds);
                if(_date.getTime() === _date.getTime())
                    return _date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true })
            }
            return 'No Time'
        },
        getReadableDatetime(store_timestamp){
            if(store_timestamp){
                let _date = new Date(0);
                _date.setSeconds(store_timestamp.seconds);
                if(_date.getTime() === _date.getTime())
                    return _date.toLocaleString(undefined, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
            }
            return 'No DateTime'
        },
        image_is_valid(extension, otherExtension=[]){
            return $.inArray(extension, ['jpg','png','jpeg'].concat(otherExtension)) !== -1
        },
        getHourDiffFromNow(timestamp){
            let _date = new Date(0);
            let now = new Date();
            _date.setSeconds(timestamp.seconds);
            if(_date.getTime() === _date.getTime()){
                return Math.abs(now - _date) / 36e5
            }
            return 0
        },
        getDaysDiffFromNow(timestamp){
            let _date = new Date(0);
            let now = new Date();
            _date.setSeconds(timestamp.seconds);
            if(_date.getTime() === _date.getTime()){
                return (now.getTime()-_date.getTime()) / (1000 * 3600 * 24);
            }
            return 0
        },
        affirm(callback, message=''){
            return iziToast.question({
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Affirm',
                message: message || 'Are you sure of this operation ?',
                position: 'center',
                buttons: [
                    ['<button><b>yes</b></button>', function (instance, toast) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        return callback()
                    }, true],
                    ['<button>never mind</button>', function (instance, toast) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                    }],
                ],
                // onClosing: function(instance, toast, closedBy){
                //     console.info('Closing | closedBy: ' + closedBy);
                // },
                // onClosed: function(instance, toast, closedBy){
                //     console.info('Closed | closedBy: ' + closedBy);
                // }
            });
        }
    }
}