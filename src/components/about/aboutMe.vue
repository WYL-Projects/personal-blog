<template>
    <div class="myInfo">
            <p>{{title}}</p>
            <slot></slot>
        </div>
</template>
<script>
export default {
    props:['title']
}
</script>