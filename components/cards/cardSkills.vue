<template>
    <div class="card card-skills card__position-left" id="cardSkills">
       hi

       <controller
            parentId="cardSkills"
            :controllers="{
                right: 'cardMenu',
                
            }"
        />
    </div>
</template>

<script>
export default {
    name: 'cardSkills',
}
</script>