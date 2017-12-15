import PanelGarbage from 'components/panel_garbage'
import Playfield from 'components/playfield'
import Panel     from 'components/panel'

describe('PanelGarbage', function() {
  describe('#class_name' ,function(){
    it('should be type of PanelGarbage', function(){
      const panel = new PanelGarbage()
      panel.should.be.a('PanelGarbage')
    })
  })
  describe('#static_execute' ,function(){
  })
  describe('#fall_execute' ,function(){
  })
  describe('#clear_execute' ,function(){
  })

  describe('#fall_check' ,function(){
  })

}) //klass
