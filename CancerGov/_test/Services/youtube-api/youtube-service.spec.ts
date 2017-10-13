import { expect, assert } from 'chai';
import * as TypeMoq from 'typemoq';
import { YouTubeService, YouTubeServiceFactory, YouTubeServiceImpl } from '../../../_src/Scripts/NCI/Services/youtube-api';

describe('Services.YouTubeAPI.YouTubeServiceFactory', () => {

    describe('create', () => {

        it('should return instance with correct name', () => {
            let svc:YouTubeService = YouTubeServiceFactory.create('myhostname');
            expect(svc instanceof YouTubeServiceImpl).to.be.true;
        });

        it('should return error for missing args', () => {
            expect(()=> {
                let svc:YouTubeService = YouTubeServiceFactory.create(null);
            }).to.throw('Valid protocol and hostname must be provided to create a YouTube API service');            
        });
        
    });
});