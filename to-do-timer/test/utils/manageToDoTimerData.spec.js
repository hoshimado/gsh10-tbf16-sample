/**
 * [manageToDoTimerData.spec.js]
 */
import {expect, assert} from 'chai';
import sinon from 'sinon';

import ManageToDoTimerData from '../../src/utils/manageToDoTimerData.js'



describe('manageToDoTimerData.js', () => {

    describe('setTimerData()', ()=>{
        let fakeClock = null;
        beforeEach(()=>{
            fakeClock = sinon.useFakeTimers(0);
        });
        afterEach(()=>{
            fakeClock.restore();
        });

        it('start timer and countdown.');

        it('pause and restart.');
        
        it('start timer and stop after over.');
        
        it('enable to fouce quit.');
    });
});



