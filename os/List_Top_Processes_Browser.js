import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

let vm = new Vue({
    el: '#displayDiv',
    data:  {
        title: 'System Processes Display',
        processes: []
    },
    methods: {
        refreshProcesses: () => {
            console.log("Calling to get processes");
            sysCallGetTopProcesses().then((processes)=>{
                console.log(processes);
                vm.processes.splice(0, vm.processes.length);
                for(let p of processes){
                    vm.processes.push(p);
                }
            }, (err)=>{
            });
        },
        quit: () => {
            window.programDone = true;
        }
    }
})