angular.module('mynotes.notestore',[]) // module contenant des services, ici on a un seul servivce
    .factory('noteStore',function () { // c'est le : noteStore
    var notes = angular.fromJson(window.localStorage['notes']) != undefined  ? angular.fromJson(window.localStorage['notes'])  : [];
        function persist() {
            window.localStorage['notes'] = angular.toJson(notes);
        }
    return {
        list:function () {
            return notes;
        },
        getIndex: function (noteId) {
            for (var i = 0 ; i<notes.length ; i++ ){
                if(notes[i].id == noteId ) return i ;

            }

        },
        delete : function (noteIndex) {
            notes.splice(noteIndex,1);
            persist();
            return;
        },
        deleteAll: function () {
            notes.splice(0,notes.length);
        },
        get: function (noteId) {
            for (var i = 0 ; i < notes.length ; i++ ){
                if (notes[i].id === noteId ) return notes[i];
            }
            return undefined;
        } ,
        create:function (note) {
            notes.push(note);
            persist();
        },
        reorder:function (note, fromIndex , toIndex) {
            notes.splice(fromIndex,1);
            notes.splice(toIndex,0,note);
            persist();
        },
        update :function (note) {
            for (var i =0 ; i < notes.length ; i++ ){
                if (notes[i].id === note.id) notes[i] =  note;
                persist();
                return;
            }
        }
    }
});