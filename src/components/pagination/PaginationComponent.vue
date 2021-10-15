<template>
<div class="col-lg-12 text-center">
    <div class="pagination__option">
        <a href="#" @click.prevent="changePage(currentPage - 1)"><i class="fa fa-angle-left"></i></a>
        <a href="#" ref="mount" @click.prevent="changePage(i + state.changeNumber)" v-for="(page,i) in pages" :key="i" :class="[state.active ==  i + state.changeNumber ? 'active' : '']">
            {{ i + state.changeNumber}} 
        </a>
        <a href="#" @click.prevent="changePage(currentPage + 1)"><i class="fa fa-angle-right"></i></a>
    </div>
</div>
</template>

<script>
import  { useRoute } from 'vue-router';
import { computed, reactive,ref,onMounted, watch } from 'vue';

export default {
    props : ['currentPage','totalRows','perPage','maxPagination','setActive'],

    setup(props,{emit}) {
        const Btn = ref();
        const mount = ref('');
        // const router = useRouter();
        const route = useRoute();

        const state = reactive({
            page : 0,
            active : 1,
            changeNumber : 1,
            currentPage : 1,
            pageRoute : '',
            temp    : null,
            changeMount : 1,
        })

        const pages = computed(() => {
            
            let page = 0;
            
            page = Math.ceil(props.totalRows / props.perPage);

            if(page >= props.maxPagination){
                page = props.maxPagination;
            }
            
            return page
        })

        const allPage = computed(() => {

            let page = 0;
            
            page = Math.ceil(props.totalRows / props.perPage);

            return page > 0 ? page : 0 ; 
        })

        const changePage = async (active) => 
        {
            // let active = 7;
            
            if(allPage.value >= active && active >= 1){
                
                emit('getPage',active)
                
                state.active = active;
                state.currentPage = active;
                
                state.temp = active;

                if( active >= pages.value && allPage.value > active  && (pages.value - 1) + state.changeNumber == active){
                    state.changeNumber += 1;
                
                }
                
                else if(state.changeNumber > 1){
                    if(active == state.changeNumber){
                        state.changeNumber -= 1; 
                    }
                }   

                localStorage.setItem('page',state.changeNumber);

                // console.log(state.active,state.changeNumber,localStorage.getItem('page') - 1);
                
           }
        }

        const propsChange = computed(() => {

            let propsData = 1;

            if(props.currentPage == 0){
                propsData = route.query.page
            }
            else{
                propsData = props.currentPage;
            }

            return propsData;
        })

        const changeUrl =  watch(() => route.query.page, async slug => {
            if(!slug){
                state.active       = 1;
                state.currentPage  = 1;
                state.changeNumber = 1;
                localStorage.removeItem('page');
            }
        })


        onMounted(() => {

            state.currentPage = propsChange.value;
            state.active      = propsChange.value;

            if(localStorage.getItem('page') == '' || localStorage.getItem('page') == 'NaN' || !localStorage.getItem('page')){
                localStorage.setItem('page',state.active);
            }

            if(!route.query.page){ 
                state.active       = 1;
                state.currentPage  = 1;
                state.changeNumber = 1;
                
                localStorage.removeItem('page');
            }

            let change = !localStorage.getItem('page') ? 1 : parseInt(localStorage.getItem('page'));
        
            if(state.active >= pages.value && allPage.value > state.active  && (pages.value - 1) + change == state.active){
                change += 1;
            }

            else if(change > 1){
                if(state.active == change){
                    change -= 1; 
                }
            }

            state.changeNumber = change;   

            console.log(localStorage.getItem('page'));
            
            changePage(state.active);

        })

        return {
            pages,
            state,
            changePage,
            allPage,
            Btn,
            mount,
            changeUrl
            // changeUrl
        }
    }
}
</script>

<style lang="css">
.pagination__option a.active{
    background: #0d0d0d;
    border-color: #0d0d0d;
    color: #ffffff;
}
</style>