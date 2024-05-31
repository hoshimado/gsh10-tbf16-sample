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

        it('start timer and countdown.', ()=>{
            const MAX_SEC = 25*60;

            const target = new ManageToDoTimerData(null);
            const apiTimer = target.setTimerData();

            expect(apiTimer.setTimerMaxSeconds(MAX_SEC)).to.be.equal(MAX_SEC);
            expect(apiTimer.startNew()).to.be.true;
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC);

            fakeClock.tick(1*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -1);
            fakeClock.tick(1*3000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -1-3);
        });

        it('pause and restart.', ()=>{
            const MAX_SEC = 25*60;

            const target = new ManageToDoTimerData(null);
            const apiTimer = target.setTimerData();

            apiTimer.setTimerMaxSeconds(MAX_SEC);
            expect(apiTimer.startNew()).to.be.true;
            expect(apiTimer.restart()).to.be.false;

            fakeClock.tick(5*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -5);

            // 一時停止中は、カウントダウンが進まないこと
            expect(apiTimer.pause()).to.be.true;
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -5);
            fakeClock.tick(2*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -5);
            expect(apiTimer.pause()).to.be.false;

            // 再開後はカウントダウンが進むこと
            expect(apiTimer.restart()).to.be.true;
            fakeClock.tick(2*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -5-2);

            // 一時停止と再開は繰り返しできること
            expect(apiTimer.pause()).to.be.true;
            expect(apiTimer.pause()).to.be.false;
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -5-2);
            expect(apiTimer.restart()).to.be.true;
            expect(apiTimer.restart()).to.be.false;
        });
        
        it('start timer and stop after over.', ()=>{
            const MAX_SEC = 25*60;

            const target = new ManageToDoTimerData(null);
            const apiTimer = target.setTimerData();

            expect(apiTimer.setTimerMaxSeconds(MAX_SEC)).to.be.equal(MAX_SEC);
            expect(apiTimer.startNew()).to.be.true;
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC);

            fakeClock.tick(7*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -7);
            fakeClock.tick((MAX_SEC -7-1)*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(1);
            fakeClock.tick(1*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(0);

            // タイムアップした後は、カウントダウンが進まないこと
            fakeClock.tick(1*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(0);
            fakeClock.tick(2*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(0);
        });

        
        it('enable to fouce quit.', ()=>{
            const MAX_SEC = 25*60;

            const target = new ManageToDoTimerData(null);
            const apiTimer = target.setTimerData();

            expect(apiTimer.setTimerMaxSeconds(MAX_SEC)).to.be.equal(MAX_SEC);
            expect(apiTimer.startNew()).to.be.true;
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC);

            fakeClock.tick(7*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -7);

            // 強制的に「停止」した後は、カウントダウンが進まないこと。再開や一時停止が出来ないこと。新規スタートは出来ること。
            expect(apiTimer.stop()).to.be.true;
            fakeClock.tick(1*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -7);
            expect(apiTimer.restart()).to.be.false;
            expect(apiTimer.pause()).to.be.false;
            expect(apiTimer.startNew()).to.be.true;
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC);
            fakeClock.tick(4*1000);
            expect(target.getTimerData()).has.property('remainSec').to.be.equal(MAX_SEC -4);
        });
    });
});



