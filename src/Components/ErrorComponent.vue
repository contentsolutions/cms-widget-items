<template>
    <div class="error-component-wrapper p-2">
        <h1 class="display-4 mb-4">{{$tc('error')}}</h1>
        <div class="mb-4">
            <p class="lead">
                {{ $t('errorNotLoadedWidget') }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorComponent'
}
</script>
