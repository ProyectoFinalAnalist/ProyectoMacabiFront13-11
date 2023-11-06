<template>
    <footer id="footer" class="text-light">
        <div class="container">
            <div class="text text-center pt-2">
                <h2>MACABI DEPORTES</h2>
            </div>
            <hr>
            <div class="d-flex justify-content-between flex-column flex-sm-row align-items-center">
                <img src="../icons/logo-footer-.png" alt="Logo">
                <div class="text text-end pt-5">
                    <h6>{{ year }} - Macabi Buenos Aires</h6>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<style scoped>
#footer {
    height: auto;
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
  
  