package io.mycat.eye.agent.mapper;

import io.mycat.eye.agent.bean.MycatServerStatus;
import io.mycat.eye.agent.bean.MycatServerStatusExample;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MycatServerStatusMapper {
    long countByExample(MycatServerStatusExample example);

    int deleteByExample(MycatServerStatusExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MycatServerStatus record);

    int insertSelective(MycatServerStatus record);

    List<MycatServerStatus> selectByExample(MycatServerStatusExample example);

    MycatServerStatus selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") MycatServerStatus record, @Param("example") MycatServerStatusExample example);

    int updateByExample(@Param("record") MycatServerStatus record, @Param("example") MycatServerStatusExample example);

    int updateByPrimaryKeySelective(MycatServerStatus record);

    int updateByPrimaryKey(MycatServerStatus record);
}