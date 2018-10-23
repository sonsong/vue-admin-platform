<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-${iconName}`"></use>
    </svg>
</template>
<script>
export default {
    props:{
        iconName :{
            type:String,
            required:true
        }
    }
}
</script>

