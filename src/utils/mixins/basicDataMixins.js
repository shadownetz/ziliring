export default {
    data(){
        return {
            whatsapp_contact_link: `https://api.whatsapp.com/send?phone=2349136318399&text=${encodeURI(
                "My name is ____. I need help with "
            )}`
        }
    }
}