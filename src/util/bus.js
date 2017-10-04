function checkFilter( category, title, checked ) {
    // parameters have been passed up through the chain
    // add or remove the filter based on 'checked' boolean
    if( checked ) {
        this[ category ].push( title );
    } else {
        let index = this[ category ].indexOf( title );
        if( index > -1 ) {
            this[ category ].splice( index, 1 );
        }
    }
}

function setDay( day ) {
  this.day = day;
}

// Note: use de-structured assignment to create checkFilter with the same name
export { checkFilter, setDay };
