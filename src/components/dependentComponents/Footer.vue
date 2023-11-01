<template>
    <footer id="footer" class="text-light py-4">
        <div class="container">
            <div class="text text-center">
                <h2>MACABI DEPORTES</h2>
            </div>
            <hr>
            <div class="text text-end">
                <h6>{{ year }} - Macabi Buenos Aires</h6>
            </div>
        </div>
    </footer>
</template>
  
<style scoped>
#footer {
    height: 140px;
    left: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    padding: 10px;
    background-color: black;
    font-family: "Montserrat", sans-serif;
}
</style>

<script>
export default {
    setup() {
        const date = new Date()
        const year = date.getFullYear()
        return {
            year
        }
    },
}
</script>
  
  