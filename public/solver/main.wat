(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $none_=>_none (func))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_i32_i32_=>_i32 (func (param i32 i32 i32 i32) (result i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $i32_i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32 i32)))
 (type $i32_i32_i32_i32_i64_i32_=>_i32 (func (param i32 i32 i32 i32 i64 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 2224))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 18732))
 (memory $0 1)
 (data (i32.const 1036) "<")
 (data (i32.const 1048) "\01\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data (i32.const 1100) "<")
 (data (i32.const 1112) "\01\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data (i32.const 1228) "<")
 (data (i32.const 1240) "\01\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data (i32.const 1292) ",")
 (data (i32.const 1304) "\01\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data (i32.const 1372) "<")
 (data (i32.const 1384) "\01\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data (i32.const 1436) ",")
 (data (i32.const 1448) "\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data (i32.const 1484) ",")
 (data (i32.const 1496) "\01\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1532) "\8c")
 (data (i32.const 1544) "\01\00\00\00p\00\00\00Y\00o\00u\00 \00m\00u\00s\00t\00 \00p\00a\00s\00s\00 \00a\00t\00 \00l\00e\00a\00s\00t\00 \00o\00n\00e\00 \00p\00o\00l\00y\00c\00u\00b\00e\00 \00t\00o\00 \00s\00o\00l\00v\00e\00 \00t\00h\00e\00 \00p\00u\00z\00z\00l\00e\00.")
 (data (i32.const 1676) "<")
 (data (i32.const 1688) "\01\00\00\00,\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00S\00o\00m\00a\00S\00o\00l\00v\00e\00r\00.\00t\00s")
 (data (i32.const 1740) "|")
 (data (i32.const 1752) "\01\00\00\00^\00\00\00E\00l\00e\00m\00e\00n\00t\00 \00t\00y\00p\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00n\00u\00l\00l\00a\00b\00l\00e\00 \00i\00f\00 \00a\00r\00r\00a\00y\00 \00i\00s\00 \00h\00o\00l\00e\00y")
 (data (i32.const 1868) "\1c")
 (data (i32.const 1900) "\1c")
 (data (i32.const 1932) "\1c")
 (data (i32.const 1944) "\0e\00\00\00\08\00\00\00\01")
 (data (i32.const 1964) "<")
 (data (i32.const 1976) "\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data (i32.const 2028) "<")
 (data (i32.const 2040) "\01\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 2092) "<")
 (data (i32.const 2104) "\01\00\00\00*\00\00\00O\00b\00j\00e\00c\00t\00 \00a\00l\00r\00e\00a\00d\00y\00 \00p\00i\00n\00n\00e\00d")
 (data (i32.const 2156) "<")
 (data (i32.const 2168) "\01\00\00\00(\00\00\00O\00b\00j\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00p\00i\00n\00n\00e\00d")
 (data (i32.const 2224) "\0f\00\00\00 \00\00\00\00\00\00\00 ")
 (data (i32.const 2252) "\02\n\00\00\00\00\00\00\01\n\00\00\02\00\00\00\02A")
 (data (i32.const 2284) " ")
 (data (i32.const 2300) "\02A\00\00\00\00\00\00\02A\00\00\00\00\00\00 \00\00\00\00\00\00\00\02\t\00\00\00\00\00\00\02A")
 (table $0 2 funcref)
 (elem $0 (i32.const 1) $assembly/SomaSolution/SomaSolution#getRotations~anonymous|0)
 (export "__new" (func $~lib/rt/itcms/__new))
 (export "__pin" (func $~lib/rt/itcms/__pin))
 (export "__unpin" (func $~lib/rt/itcms/__unpin))
 (export "__collect" (func $~lib/rt/itcms/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (export "solve" (func $export:assembly/index/solve))
 (start $~start)
 (func $~lib/rt/itcms/initLazy (param $0 i32) (result i32)
  local.get $0
  local.get $0
  i32.store offset=4
  local.get $0
  local.get $0
  i32.store offset=8
  local.get $0
 )
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  i32.const 1248
  call $~lib/rt/itcms/__visit
  i32.const 1456
  call $~lib/rt/itcms/__visit
  i32.const 1760
  call $~lib/rt/itcms/__visit
  i32.const 1056
  call $~lib/rt/itcms/__visit
  i32.const 2112
  call $~lib/rt/itcms/__visit
  i32.const 2176
  call $~lib/rt/itcms/__visit
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    drop
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#set:color (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#set:next (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#unlink (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.tee $1
  i32.eqz
  if
   local.get $0
   i32.load offset=8
   drop
   return
  end
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $0
  i32.store offset=8
  local.get $0
  local.get $1
  call $~lib/rt/itcms/Object#set:next
 )
 (func $~lib/rt/itcms/Object#linkTo (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.load offset=8
  local.set $3
  local.get $0
  local.get $1
  local.get $2
  i32.or
  i32.store offset=4
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $0
  call $~lib/rt/itcms/Object#set:next
  local.get $1
  local.get $0
  i32.store offset=8
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  local.get $0
  global.get $~lib/rt/itcms/iter
  i32.eq
  if
   local.get $0
   i32.load offset=8
   global.set $~lib/rt/itcms/iter
  end
  local.get $0
  call $~lib/rt/itcms/Object#unlink
  local.get $0
  global.get $~lib/rt/itcms/toSpace
  local.get $0
  i32.load offset=12
  local.tee $0
  i32.const 1
  i32.le_u
  if (result i32)
   i32.const 1
  else
   local.get $0
   i32.const 2224
   i32.load
   i32.gt_u
   if
    i32.const 1248
    i32.const 1312
    i32.const 22
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.const 3
   i32.shl
   i32.const 2228
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  if (result i32)
   global.get $~lib/rt/itcms/white
   i32.eqz
  else
   i32.const 2
  end
  call $~lib/rt/itcms/Object#linkTo
 )
 (func $~lib/rt/itcms/__visit (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/itcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  i32.const -4
  i32.and
  local.tee $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $2
   i32.const 1073741820
   local.get $2
   i32.const 1073741820
   i32.lt_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $4
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.set $2
  local.get $1
  i32.load offset=8
  local.set $3
  local.get $1
  i32.load offset=4
  local.tee $5
  if
   local.get $5
   local.get $3
   i32.store offset=8
  end
  local.get $3
  if
   local.get $3
   local.get $5
   i32.store offset=4
  end
  local.get $1
  local.get $0
  local.get $2
  local.get $4
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  i32.eq
  if
   local.get $0
   local.get $2
   local.get $4
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   local.get $3
   i32.store offset=96
   local.get $3
   i32.eqz
   if
    local.get $0
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    local.tee $3
    i32.load offset=4
    i32.const -2
    local.get $2
    i32.rotl
    i32.and
    local.set $1
    local.get $3
    local.get $1
    i32.store offset=4
    local.get $1
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $4
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.load
  local.set $3
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.set $6
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $0
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $3
   i32.const 1073741820
   local.get $3
   i32.const 1073741820
   i32.lt_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $5
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  local.get $5
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $4
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $4
  i32.store offset=8
  local.get $4
  if
   local.get $4
   local.get $1
   i32.store offset=4
  end
  local.get $0
  local.get $3
  local.get $5
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $3
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $2
  i32.const -16
  i32.and
  local.get $0
  i32.load offset=1568
  local.tee $2
  if
   local.get $2
   local.get $1
   i32.const 16
   i32.sub
   i32.eq
   if
    local.get $2
    i32.load
    local.set $3
    local.get $1
    i32.const 16
    i32.sub
    local.set $1
   end
  end
  local.get $1
  i32.sub
  local.tee $2
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $3
  i32.const 2
  i32.and
  local.get $2
  i32.const 8
  i32.sub
  local.tee $2
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $1
  i32.const 4
  i32.add
  i32.add
  local.tee $2
  i32.const 2
  i32.store
  local.get $0
  local.get $2
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $0
  i32.const 1
  i32.lt_s
  if (result i32)
   i32.const 1
   local.get $0
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 18736
  i32.const 0
  i32.store
  i32.const 20304
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $1
   i32.const 23
   i32.lt_u
   if
    local.get $1
    i32.const 2
    i32.shl
    i32.const 18736
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $0
    loop $for-loop|1
     local.get $0
     i32.const 16
     i32.lt_u
     if
      local.get $0
      local.get $1
      i32.const 4
      i32.shl
      i32.add
      i32.const 2
      i32.shl
      i32.const 18736
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|1
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  i32.const 18736
  i32.const 20308
  memory.size
  i32.const 16
  i32.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 18736
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  block $folding-inner0
   block $break|0
    block $case2|0
     block $case1|0
      block $case0|0
       global.get $~lib/rt/itcms/state
       br_table $case0|0 $case1|0 $case2|0 $break|0
      end
      i32.const 1
      global.set $~lib/rt/itcms/state
      i32.const 0
      global.set $~lib/rt/itcms/visitCount
      call $~lib/rt/itcms/visitRoots
      global.get $~lib/rt/itcms/toSpace
      global.set $~lib/rt/itcms/iter
      br $folding-inner0
     end
     global.get $~lib/rt/itcms/white
     i32.eqz
     local.set $1
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|1
      local.get $0
      global.get $~lib/rt/itcms/toSpace
      i32.ne
      if
       local.get $0
       global.set $~lib/rt/itcms/iter
       local.get $1
       local.get $0
       i32.load offset=4
       i32.const 3
       i32.and
       i32.ne
       if
        local.get $0
        local.get $1
        call $~lib/rt/itcms/Object#set:color
        i32.const 0
        global.set $~lib/rt/itcms/visitCount
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
        br $folding-inner0
       end
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       local.set $0
       br $while-continue|1
      end
     end
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     i32.eq
     if
      global.get $~lib/memory/__stack_pointer
      local.set $0
      loop $while-continue|0
       local.get $0
       i32.const 18732
       i32.lt_u
       if
        local.get $0
        i32.load
        call $~lib/rt/itcms/__visit
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      global.get $~lib/rt/itcms/iter
      i32.load offset=4
      i32.const -4
      i32.and
      local.set $0
      loop $while-continue|2
       local.get $0
       global.get $~lib/rt/itcms/toSpace
       i32.ne
       if
        local.get $1
        local.get $0
        i32.load offset=4
        i32.const 3
        i32.and
        i32.ne
        if
         local.get $0
         local.get $1
         call $~lib/rt/itcms/Object#set:color
         local.get $0
         i32.const 20
         i32.add
         call $~lib/rt/__visit_members
        end
        local.get $0
        i32.load offset=4
        i32.const -4
        i32.and
        local.set $0
        br $while-continue|2
       end
      end
      global.get $~lib/rt/itcms/fromSpace
      local.set $0
      global.get $~lib/rt/itcms/toSpace
      global.set $~lib/rt/itcms/fromSpace
      local.get $0
      global.set $~lib/rt/itcms/toSpace
      local.get $1
      global.set $~lib/rt/itcms/white
      local.get $0
      i32.load offset=4
      i32.const -4
      i32.and
      global.set $~lib/rt/itcms/iter
      i32.const 2
      global.set $~lib/rt/itcms/state
     end
     br $folding-inner0
    end
    global.get $~lib/rt/itcms/iter
    local.tee $0
    global.get $~lib/rt/itcms/toSpace
    i32.ne
    if
     local.get $0
     i32.load offset=4
     i32.const -4
     i32.and
     global.set $~lib/rt/itcms/iter
     local.get $0
     i32.load offset=4
     drop
     local.get $0
     i32.const 18732
     i32.lt_u
     if
      local.get $0
      i32.const 0
      i32.store offset=4
      local.get $0
      i32.const 0
      i32.store offset=8
     else
      global.get $~lib/rt/itcms/total
      local.get $0
      i32.load
      i32.const -4
      i32.and
      i32.const 4
      i32.add
      i32.sub
      global.set $~lib/rt/itcms/total
      local.get $0
      i32.const 4
      i32.add
      local.tee $1
      i32.const 18732
      i32.ge_u
      if
       global.get $~lib/rt/tlsf/ROOT
       i32.eqz
       if
        call $~lib/rt/tlsf/initialize
       end
       local.get $1
       i32.const 4
       i32.sub
       local.set $0
       local.get $1
       i32.const 15
       i32.and
       i32.const 1
       local.get $1
       select
       i32.eqz
       if
        local.get $0
        i32.load
        drop
       end
       local.get $0
       local.get $0
       i32.load
       i32.const 1
       i32.or
       i32.store
       global.get $~lib/rt/tlsf/ROOT
       local.get $0
       call $~lib/rt/tlsf/insertBlock
      end
     end
     i32.const 10
     return
    end
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/toSpace
    i32.store offset=4
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/toSpace
    i32.store offset=8
    i32.const 0
    global.set $~lib/rt/itcms/state
   end
   i32.const 0
   return
  end
  global.get $~lib/rt/itcms/visitCount
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if
   local.get $1
   i32.const 4
   i32.shr_u
   local.set $1
  else
   i32.const 31
   local.get $1
   i32.const 1
   i32.const 27
   local.get $1
   i32.clz
   i32.sub
   i32.shl
   i32.add
   i32.const 1
   i32.sub
   local.get $1
   local.get $1
   i32.const 536870910
   i32.lt_u
   select
   local.tee $1
   i32.clz
   i32.sub
   local.set $2
   local.get $1
   local.get $2
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
   local.set $1
   local.get $2
   i32.const 7
   i32.sub
   local.set $2
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 4
    i32.shl
    local.get $0
    local.get $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    i32.ctz
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/__alloc (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.set $2
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1392
   i32.const 458
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const 12
  local.get $0
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.get $0
  i32.const 12
  i32.le_u
  select
  local.tee $1
  call $~lib/rt/tlsf/searchBlock
  local.tee $0
  i32.eqz
  if
   i32.const 4
   memory.size
   local.tee $0
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   local.get $2
   i32.load offset=1568
   i32.ne
   i32.shl
   local.get $1
   i32.const 1
   i32.const 27
   local.get $1
   i32.clz
   i32.sub
   i32.shl
   i32.const 1
   i32.sub
   i32.add
   local.get $1
   local.get $1
   i32.const 536870910
   i32.lt_u
   select
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.set $3
   local.get $0
   local.get $3
   local.get $0
   local.get $3
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $3
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $2
   local.get $0
   i32.const 16
   i32.shl
   memory.size
   i32.const 16
   i32.shl
   call $~lib/rt/tlsf/addMemory
   local.get $2
   local.get $1
   call $~lib/rt/tlsf/searchBlock
   local.set $0
  end
  local.get $0
  i32.load
  drop
  local.get $2
  local.get $0
  call $~lib/rt/tlsf/removeBlock
  local.get $0
  i32.load
  local.tee $3
  i32.const -4
  i32.and
  local.get $1
  i32.sub
  local.tee $4
  i32.const 16
  i32.ge_u
  if
   local.get $0
   local.get $1
   local.get $3
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $1
   local.get $0
   i32.const 4
   i32.add
   i32.add
   local.tee $1
   local.get $4
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $2
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $0
   local.get $3
   i32.const -2
   i32.and
   i32.store
   local.get $0
   i32.const 4
   i32.add
   local.tee $1
   local.get $0
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.get $1
   local.get $0
   i32.load
   i32.const -4
   i32.and
   i32.add
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $0
  i32.const 4
  i32.add
 )
 (func $~lib/memory/memory.fill (param $0 i32) (param $1 i32)
  (local $2 i32)
  block $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   local.tee $2
   i32.const 1
   i32.sub
   i32.const 0
   i32.store8
   local.get $1
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8 offset=1
   local.get $0
   i32.const 0
   i32.store8 offset=2
   local.get $2
   i32.const 2
   i32.sub
   i32.const 0
   i32.store8
   local.get $2
   i32.const 3
   i32.sub
   i32.const 0
   i32.store8
   local.get $1
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8 offset=3
   local.get $2
   i32.const 4
   i32.sub
   i32.const 0
   i32.store8
   local.get $1
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   local.get $0
   i32.sub
   i32.const 3
   i32.and
   local.tee $2
   i32.add
   local.tee $0
   i32.const 0
   i32.store
   local.get $0
   local.get $1
   local.get $2
   i32.sub
   i32.const -4
   i32.and
   local.tee $2
   i32.add
   local.tee $1
   i32.const 4
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=8
   local.get $1
   i32.const 12
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   i32.const 8
   i32.sub
   i32.const 0
   i32.store
   local.get $2
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=12
   local.get $0
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.const 0
   i32.store offset=20
   local.get $0
   i32.const 0
   i32.store offset=24
   local.get $1
   i32.const 28
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   i32.const 24
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   i32.const 20
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   i32.const 16
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   local.get $0
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $1
   i32.add
   local.set $0
   local.get $2
   local.get $1
   i32.sub
   local.set $1
   loop $while-continue|0
    local.get $1
    i32.const 32
    i32.ge_u
    if
     local.get $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     local.get $0
     i64.const 0
     i64.store offset=16
     local.get $0
     i64.const 0
     i64.store offset=24
     local.get $1
     i32.const 32
     i32.sub
     local.set $1
     local.get $0
     i32.const 32
     i32.add
     local.set $0
     br $while-continue|0
    end
   end
  end
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 260
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt
    i32.const 2048
    local.set $2
    loop $do-continue|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-continue|0
    end
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/__alloc
  i32.const 4
  i32.sub
  local.tee $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  local.get $2
  global.get $~lib/rt/itcms/fromSpace
  global.get $~lib/rt/itcms/white
  call $~lib/rt/itcms/Object#linkTo
  global.get $~lib/rt/itcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $1
  local.get $0
  call $~lib/memory/memory.fill
  local.get $1
 )
 (func $assembly/VoxelSpace/VoxelSpace#at (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  local.get $0
  i64.load offset=8
  i32.const 1
  local.get $3
  local.get $1
  local.get $0
  i32.load offset=24
  local.get $0
  i32.load offset=28
  i32.mul
  i32.mul
  local.get $2
  local.get $0
  i32.load offset=28
  i32.mul
  i32.add
  i32.add
  i32.shl
  i64.extend_i32_s
  i64.and
  i64.const 0
  i64.ne
 )
 (func $assembly/VoxelSpace/VoxelSpace#cullEmptySpace (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i64)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getExtrema
  local.tee $1
  i32.store
  local.get $1
  i32.load offset=4
  local.set $2
  loop $for-loop|0
   local.get $2
   local.get $1
   i32.load
   i32.le_s
   if
    local.get $1
    i32.load offset=12
    local.set $3
    loop $for-loop|1
     local.get $3
     local.get $1
     i32.load offset=8
     i32.le_s
     if
      local.get $1
      i32.load offset=20
      local.set $4
      loop $for-loop|2
       local.get $4
       local.get $1
       i32.load offset=16
       i32.le_s
       if
        local.get $5
        i64.const 1
        local.get $6
        i64.extend_i32_s
        i64.shl
        i64.or
        local.get $5
        local.get $0
        local.get $2
        local.get $3
        local.get $4
        call $assembly/VoxelSpace/VoxelSpace#at
        select
        local.set $5
        local.get $6
        i32.const 1
        i32.add
        local.set $6
        local.get $4
        i32.const 1
        i32.add
        local.set $4
        br $for-loop|2
       end
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|1
     end
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $0
  local.get $1
  i32.load
  local.get $1
  i32.load offset=4
  i32.sub
  i32.const 1
  i32.add
  i32.store offset=20
  local.get $0
  local.get $1
  i32.load offset=8
  local.get $1
  i32.load offset=12
  i32.sub
  i32.const 1
  i32.add
  i32.store offset=24
  local.get $0
  local.get $1
  i32.load offset=16
  local.get $1
  i32.load offset=20
  i32.sub
  i32.const 1
  i32.add
  i32.store offset=28
  local.get $0
  local.get $5
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/rt/itcms/__link (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $0
   i32.load offset=4
   i32.const 3
   i32.and
   local.tee $3
   local.set $4
   local.get $3
   global.get $~lib/rt/itcms/white
   i32.eqz
   i32.eq
   if
    local.get $0
    local.get $1
    local.get $2
    select
    call $~lib/rt/itcms/Object#makeGray
   else
    global.get $~lib/rt/itcms/state
    i32.const 1
    i32.eq
    i32.const 0
    local.get $4
    i32.const 3
    i32.eq
    select
    if
     local.get $1
     call $~lib/rt/itcms/Object#makeGray
    end
   end
  end
 )
 (func $assembly/SomaSolver/SomaSolver#set:solutionCube (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
 )
 (func $assembly/SomaSolver/SomaSolver#set:solutions (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store offset=16
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  block $~lib/util/memory/memmove|inlined.0
   local.get $2
   local.set $4
   local.get $0
   local.get $1
   i32.eq
   br_if $~lib/util/memory/memmove|inlined.0
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|0
      local.get $0
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $4
       i32.const 1
       i32.sub
       local.set $4
       local.get $0
       local.tee $2
       i32.const 1
       i32.add
       local.set $0
       local.get $1
       local.tee $3
       i32.const 1
       i32.add
       local.set $1
       local.get $2
       local.get $3
       i32.load8_u
       i32.store8
       br $while-continue|0
      end
     end
     loop $while-continue|1
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $0
       local.get $1
       i64.load
       i64.store
       local.get $4
       i32.const 8
       i32.sub
       local.set $4
       local.get $0
       i32.const 8
       i32.add
       local.set $0
       local.get $1
       i32.const 8
       i32.add
       local.set $1
       br $while-continue|1
      end
     end
    end
    loop $while-continue|2
     local.get $4
     if
      local.get $0
      local.tee $2
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      local.tee $3
      i32.const 1
      i32.add
      local.set $1
      local.get $2
      local.get $3
      i32.load8_u
      i32.store8
      local.get $4
      i32.const 1
      i32.sub
      local.set $4
      br $while-continue|2
     end
    end
   else
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|3
      local.get $0
      local.get $4
      i32.add
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $0
       local.get $4
       i32.const 1
       i32.sub
       local.tee $4
       i32.add
       local.get $1
       local.get $4
       i32.add
       i32.load8_u
       i32.store8
       br $while-continue|3
      end
     end
     loop $while-continue|4
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $0
       local.get $4
       i32.const 8
       i32.sub
       local.tee $4
       i32.add
       local.get $1
       local.get $4
       i32.add
       i64.load
       i64.store
       br $while-continue|4
      end
     end
    end
    loop $while-continue|5
     local.get $4
     if
      local.get $0
      local.get $4
      i32.const 1
      i32.sub
      local.tee $4
      i32.add
      local.get $1
      local.get $4
      i32.add
      i32.load8_u
      i32.store8
      br $while-continue|5
     end
    end
   end
  end
 )
 (func $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  local.get $0
  i32.load offset=12
  local.tee $8
  i32.const 1
  i32.add
  local.tee $5
  local.get $0
  i32.load offset=8
  local.tee $6
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $5
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1456
    i32.const 1504
    i32.const 17
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   block $__inlined_func$~lib/rt/itcms/__renew
    local.get $6
    i32.const 1
    i32.shl
    local.tee $3
    i32.const 1073741820
    local.get $3
    i32.const 1073741820
    i32.lt_u
    select
    local.tee $2
    local.get $5
    i32.const 8
    local.get $5
    i32.const 8
    i32.gt_u
    select
    i32.const 2
    i32.shl
    local.tee $3
    local.get $2
    local.get $3
    i32.gt_u
    select
    local.tee $4
    local.get $0
    i32.load
    local.tee $9
    local.tee $2
    i32.const 20
    i32.sub
    local.tee $7
    i32.load
    i32.const -4
    i32.and
    i32.const 16
    i32.sub
    i32.le_u
    if
     local.get $7
     local.get $4
     i32.store offset=16
     br $__inlined_func$~lib/rt/itcms/__renew
    end
    local.get $4
    local.get $7
    i32.load offset=12
    call $~lib/rt/itcms/__new
    local.tee $3
    local.get $2
    local.get $4
    local.get $7
    i32.load offset=16
    local.tee $2
    local.get $2
    local.get $4
    i32.gt_u
    select
    call $~lib/memory/memory.copy
    local.get $3
    local.set $2
   end
   local.get $2
   local.get $6
   i32.add
   local.get $4
   local.get $6
   i32.sub
   call $~lib/memory/memory.fill
   local.get $2
   local.get $9
   i32.ne
   if
    local.get $0
    local.get $2
    i32.store
    local.get $0
    local.get $2
    i32.store offset=4
    local.get $0
    local.get $2
    i32.const 0
    call $~lib/rt/itcms/__link
   end
   local.get $0
   local.get $4
   i32.store offset=8
  end
  local.get $0
  i32.load offset=4
  local.get $8
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.const 1
  call $~lib/rt/itcms/__link
  local.get $0
  local.get $5
  i32.store offset=12
 )
 (func $assembly/VoxelSpace/VoxelSpace#clone (param $0 i32) (result i32)
  local.get $0
  i32.load offset=16
  local.get $0
  i32.load offset=20
  local.get $0
  i32.load offset=24
  local.get $0
  i32.load offset=28
  local.get $0
  i64.load offset=8
  i32.const 0
  call $assembly/VoxelSpace/VoxelSpace#constructor
 )
 (func $assembly/VoxelSpace/VoxelSpace#rotated90X (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  loop $for-loop|0
   local.get $4
   local.get $0
   i32.load offset=20
   i32.lt_s
   if
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     local.get $0
     i32.load offset=24
     i32.lt_s
     if
      i32.const 0
      local.set $3
      loop $for-loop|2
       local.get $3
       local.get $0
       i32.load offset=28
       i32.lt_s
       if
        local.get $0
        local.get $4
        local.get $2
        local.get $3
        call $assembly/VoxelSpace/VoxelSpace#at
        if
         local.get $1
         i32.const 1
         local.get $2
         local.get $4
         local.get $0
         i32.load offset=28
         local.get $0
         i32.load offset=24
         i32.mul
         i32.mul
         local.get $0
         i32.load offset=24
         local.get $0
         i32.load offset=28
         i32.const 1
         i32.sub
         local.get $3
         i32.sub
         i32.mul
         i32.add
         i32.add
         i32.shl
         i32.or
         local.set $1
        end
        local.get $3
        i32.const 1
        i32.add
        local.set $3
        br $for-loop|2
       end
      end
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  local.get $0
  i32.load offset=16
  local.get $0
  i32.load offset=20
  local.get $0
  i32.load offset=28
  local.get $0
  i32.load offset=24
  local.get $1
  i64.extend_i32_s
  i32.const 0
  call $assembly/VoxelSpace/VoxelSpace#constructor
 )
 (func $assembly/VoxelSpace/VoxelSpace#matches (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  i32.load offset=20
  local.get $0
  i32.load offset=20
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $1
  i32.load offset=24
  local.get $0
  i32.load offset=24
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $1
  i32.load offset=28
  local.get $0
  i32.load offset=28
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i64.load offset=8
  local.get $1
  i64.load offset=8
  i64.eq
 )
 (func $assembly/VoxelSpace/VoxelSpace#rotated90Y (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  loop $for-loop|0
   local.get $4
   local.get $0
   i32.load offset=20
   i32.lt_s
   if
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     local.get $0
     i32.load offset=24
     i32.lt_s
     if
      i32.const 0
      local.set $3
      loop $for-loop|2
       local.get $3
       local.get $0
       i32.load offset=28
       i32.lt_s
       if
        local.get $0
        local.get $4
        local.get $2
        local.get $3
        call $assembly/VoxelSpace/VoxelSpace#at
        if
         local.get $1
         i32.const 1
         local.get $3
         local.get $0
         i32.load offset=24
         local.get $0
         i32.load offset=20
         i32.mul
         i32.mul
         local.get $2
         local.get $0
         i32.load offset=20
         i32.mul
         i32.add
         local.get $0
         i32.load offset=20
         i32.const 1
         i32.sub
         local.get $4
         i32.sub
         i32.add
         i32.shl
         i32.or
         local.set $1
        end
        local.get $3
        i32.const 1
        i32.add
        local.set $3
        br $for-loop|2
       end
      end
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  local.get $0
  i32.load offset=16
  local.get $0
  i32.load offset=28
  local.get $0
  i32.load offset=24
  local.get $0
  i32.load offset=20
  local.get $1
  i64.extend_i32_s
  i32.const 0
  call $assembly/VoxelSpace/VoxelSpace#constructor
 )
 (func $assembly/VoxelSpace/VoxelSpace#rot90Y (param $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rotated90Y
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  i64.load offset=8
  i64.store offset=8
  local.get $0
  local.get $1
  i32.load offset=20
  i32.store offset=20
  local.get $0
  local.get $1
  i32.load offset=24
  i32.store offset=24
  local.get $0
  local.get $1
  i32.load offset=28
  i32.store offset=28
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/VoxelSpace/VoxelSpace#rotated90Z (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  loop $for-loop|0
   local.get $4
   local.get $0
   i32.load offset=20
   i32.lt_s
   if
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     local.get $0
     i32.load offset=24
     i32.lt_s
     if
      i32.const 0
      local.set $3
      loop $for-loop|2
       local.get $3
       local.get $0
       i32.load offset=28
       i32.lt_s
       if
        local.get $0
        local.get $4
        local.get $2
        local.get $3
        call $assembly/VoxelSpace/VoxelSpace#at
        if
         local.get $1
         i32.const 1
         local.get $3
         local.get $0
         i32.load offset=24
         i32.const 1
         i32.sub
         local.get $2
         i32.sub
         local.get $0
         i32.load offset=20
         local.get $0
         i32.load offset=28
         i32.mul
         i32.mul
         local.get $4
         local.get $0
         i32.load offset=28
         i32.mul
         i32.add
         i32.add
         i32.shl
         i32.or
         local.set $1
        end
        local.get $3
        i32.const 1
        i32.add
        local.set $3
        br $for-loop|2
       end
      end
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  local.get $0
  i32.load offset=16
  local.get $0
  i32.load offset=24
  local.get $0
  i32.load offset=20
  local.get $0
  i32.load offset=28
  local.get $1
  i64.extend_i32_s
  i32.const 0
  call $assembly/VoxelSpace/VoxelSpace#constructor
 )
 (func $assembly/VoxelSpace/VoxelSpace#rot90Z (param $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rotated90Z
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  i64.load offset=8
  i64.store offset=8
  local.get $0
  local.get $1
  i32.load offset=20
  i32.store offset=20
  local.get $0
  local.get $1
  i32.load offset=24
  i32.store offset=24
  local.get $0
  local.get $1
  i32.load offset=28
  i32.store offset=28
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/SomaSolution/SomaSolution#getRotations~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getAllRotations
 )
 (func $~lib/rt/itcms/__pin (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $1
   i32.load offset=4
   i32.const 3
   i32.and
   i32.const 3
   i32.eq
   if
    i32.const 2112
    i32.const 1120
    i32.const 337
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   local.get $1
   global.get $~lib/rt/itcms/pinSpace
   i32.const 3
   call $~lib/rt/itcms/Object#linkTo
  end
  local.get $0
 )
 (func $~lib/rt/itcms/__unpin (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.const 3
  i32.ne
  if
   i32.const 2176
   i32.const 1120
   i32.const 351
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/state
  i32.const 1
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
  else
   local.get $0
   call $~lib/rt/itcms/Object#unlink
   local.get $0
   global.get $~lib/rt/itcms/fromSpace
   global.get $~lib/rt/itcms/white
   call $~lib/rt/itcms/Object#linkTo
  end
 )
 (func $~lib/rt/itcms/__collect
  global.get $~lib/rt/itcms/state
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    global.get $~lib/rt/itcms/state
    if
     call $~lib/rt/itcms/step
     drop
     br $while-continue|0
    end
   end
  end
  call $~lib/rt/itcms/step
  drop
  loop $while-continue|1
   global.get $~lib/rt/itcms/state
   if
    call $~lib/rt/itcms/step
    drop
    br $while-continue|1
   end
  end
  global.get $~lib/rt/itcms/total
  i64.extend_i32_u
  i64.const 200
  i64.mul
  i64.const 100
  i64.div_u
  i32.wrap_i64
  i32.const 1024
  i32.add
  global.set $~lib/rt/itcms/threshold
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  block $folding-inner0
   block $folding-inner3
    block $folding-inner2
     block $invalid
      block $~lib/function/Function<%28assembly/VoxelSpace/VoxelSpace%2Ci32%2C~lib/array/Array<assembly/VoxelSpace/VoxelSpace>%29=>~lib/array/Array<assembly/VoxelSpace/VoxelSpace>>
       block $assembly/VoxelSpace/Extrema
        block $assembly/VoxelSpace/VoxelSpace
         block $assembly/SomaSolver/SomaSolver
          block $~lib/string/String
           block $~lib/arraybuffer/ArrayBuffer
            local.get $0
            i32.const 8
            i32.sub
            i32.load
            br_table $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner3 $folding-inner0 $folding-inner3 $folding-inner2 $assembly/SomaSolver/SomaSolver $assembly/VoxelSpace/VoxelSpace $folding-inner3 $folding-inner2 $folding-inner2 $assembly/VoxelSpace/Extrema $folding-inner0 $folding-inner2 $~lib/function/Function<%28assembly/VoxelSpace/VoxelSpace%2Ci32%2C~lib/array/Array<assembly/VoxelSpace/VoxelSpace>%29=>~lib/array/Array<assembly/VoxelSpace/VoxelSpace>> $invalid
           end
           return
          end
          return
         end
         local.get $0
         i32.load
         local.tee $1
         if
          local.get $1
          call $~lib/rt/itcms/__visit
         end
         local.get $0
         i32.load offset=16
         local.tee $0
         if
          local.get $0
          call $~lib/rt/itcms/__visit
         end
         return
        end
        return
       end
       return
      end
      local.get $0
      i32.load offset=4
      call $~lib/rt/itcms/__visit
      return
     end
     unreachable
    end
    local.get $0
    i32.load offset=4
    local.tee $1
    local.get $0
    i32.load offset=12
    i32.const 2
    i32.shl
    i32.add
    local.set $2
    loop $while-continue|0
     local.get $1
     local.get $2
     i32.lt_u
     if
      local.get $1
      i32.load
      local.tee $3
      if
       local.get $3
       call $~lib/rt/itcms/__visit
      end
      local.get $1
      i32.const 4
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    br $folding-inner0
   end
   local.get $0
   i32.load
   local.tee $0
   if
    local.get $0
    call $~lib/rt/itcms/__visit
   end
   return
  end
  local.get $0
  i32.load
  call $~lib/rt/itcms/__visit
 )
 (func $~start
  memory.size
  i32.const 16
  i32.shl
  i32.const 18732
  i32.sub
  i32.const 1
  i32.shr_u
  global.set $~lib/rt/itcms/threshold
  i32.const 1168
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/pinSpace
  i32.const 1200
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/toSpace
  i32.const 1344
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/fromSpace
 )
 (func $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 2348
  i32.lt_s
  if
   i32.const 18752
   i32.const 18800
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $assembly/VoxelSpace/VoxelSpace#getXAxisSpins (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#constructor
  local.tee $1
  i32.store
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#clone
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
  loop $for-loop|0
   local.get $2
   i32.const 3
   i32.lt_s
   if
    local.get $1
    local.get $2
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    call $assembly/VoxelSpace/VoxelSpace#rotated90X
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $1
    local.get $0
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/VoxelSpace/VoxelSpace.pushNewUniqueSpaces (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  loop $for-loop|0
   local.get $3
   local.get $1
   i32.load offset=12
   i32.lt_s
   if
    i32.const 0
    local.set $4
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     local.get $0
     i32.load offset=12
     i32.lt_s
     if
      block $for-break1
       local.get $1
       local.get $3
       call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
       local.set $5
       global.get $~lib/memory/__stack_pointer
       local.get $5
       i32.store
       local.get $0
       local.get $2
       call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
       local.set $6
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store offset=4
       local.get $5
       local.get $6
       call $assembly/VoxelSpace/VoxelSpace#matches
       if
        i32.const 1
        local.set $4
        br $for-break1
       end
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|1
      end
     end
    end
    local.get $4
    i32.eqz
    if
     local.get $1
     local.get $3
     call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
     local.set $2
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $0
     local.get $2
     call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/VoxelSpace/VoxelSpace#getUniqueRotations (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#constructor
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#clone
  local.tee $0
  i32.store offset=4
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $assembly/VoxelSpace/VoxelSpace.pushNewUniqueSpaces
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Y
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $assembly/VoxelSpace/VoxelSpace.pushNewUniqueSpaces
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Y
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $assembly/VoxelSpace/VoxelSpace.pushNewUniqueSpaces
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Y
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $assembly/VoxelSpace/VoxelSpace.pushNewUniqueSpaces
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Z
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $assembly/VoxelSpace/VoxelSpace.pushNewUniqueSpaces
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Z
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Z
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace.pushNewUniqueSpaces
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/SomaSolution/SomaSolution#addSpace (param $0 i32) (param $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  local.get $0
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/SomaSolver/SomaSolver#backtrackSolve (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i64)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=24
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.const 0
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
  local.tee $11
  i32.store
  loop $for-loop|0
   local.get $9
   local.get $11
   i32.load offset=12
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $11
    local.get $9
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
    local.set $5
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=4
    block $__inlined_func$assembly/VoxelSpace/VoxelSpace#plus (result i32)
     local.get $5
     i64.load offset=8
     local.tee $13
     local.get $1
     i64.load offset=8
     i64.or
     local.get $13
     local.get $1
     i64.load offset=8
     i64.xor
     i64.eq
     if
      local.get $1
      i32.load offset=16
      local.get $1
      i32.load offset=20
      local.get $1
      i32.load offset=24
      local.get $1
      i32.load offset=28
      local.get $13
      local.get $1
      i64.load offset=8
      i64.or
      i32.const 0
      call $assembly/VoxelSpace/VoxelSpace#constructor
      br $__inlined_func$assembly/VoxelSpace/VoxelSpace#plus
     end
     i32.const 0
    end
    local.tee $10
    i32.store offset=8
    local.get $10
    if
     global.get $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.sub
     global.set $~lib/memory/__stack_pointer
     call $~stack_check
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.load offset=4
     local.get $3
     i32.load offset=8
     local.get $3
     i32.load offset=12
     call $assembly/SomaSolution/SomaSolution#constructor
     local.tee $8
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.load
     local.tee $6
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.load
     local.tee $7
     i32.store offset=8
     local.get $8
     local.get $6
     local.get $7
     i32.load offset=12
     call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#slice
     call $assembly/SomaSolver/SomaSolver#set:solutionCube
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $8
     i32.store offset=12
     local.get $11
     local.get $9
     call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
     local.set $5
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=4
     local.get $8
     local.get $5
     call $assembly/SomaSolution/SomaSolution#addSpace
     local.get $2
     i32.load offset=12
     i32.const 1
     i32.eq
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load offset=16
      local.tee $1
      i32.store offset=16
      local.get $1
      local.get $8
      call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load offset=4
      local.get $0
      i32.load offset=8
      local.get $0
      i32.load offset=12
      call $assembly/SomaSolution/SomaSolution#constructor
      i32.store offset=20
      global.get $~lib/memory/__stack_pointer
      i32.const 28
      i32.add
      global.set $~lib/memory/__stack_pointer
      return
     else
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      call $~stack_check
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      i32.const 1
      local.get $2
      i32.load offset=12
      local.tee $5
      local.get $5
      i32.const 1
      i32.gt_s
      select
      local.set $7
      global.get $~lib/memory/__stack_pointer
      local.get $5
      local.get $7
      i32.sub
      local.tee $5
      i32.const 0
      local.get $5
      i32.const 0
      i32.gt_s
      select
      local.tee $12
      i32.const 13
      i32.const 0
      call $~lib/rt/__newArray
      local.tee $6
      i32.store
      local.get $6
      i32.load offset=4
      local.set $14
      local.get $2
      i32.load offset=4
      local.get $7
      i32.const 2
      i32.shl
      i32.add
      local.set $7
      i32.const 0
      local.set $5
      local.get $12
      i32.const 2
      i32.shl
      local.set $12
      loop $while-continue|0
       local.get $5
       local.get $12
       i32.lt_u
       if
        local.get $5
        local.get $14
        i32.add
        local.get $5
        local.get $7
        i32.add
        i32.load
        local.tee $15
        i32.store
        local.get $6
        local.get $15
        i32.const 1
        call $~lib/rt/itcms/__link
        local.get $5
        i32.const 4
        i32.add
        local.set $5
        br $while-continue|0
       end
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store offset=24
      local.get $0
      local.get $10
      local.get $6
      local.get $8
      local.get $4
      i32.const 1
      i32.add
      call $assembly/SomaSolver/SomaSolver#backtrackSolve
     end
    end
    local.get $9
    i32.const 1
    i32.add
    local.set $9
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/VoxelSpace/VoxelSpace#getAllRotations (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#constructor
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#clone
  local.tee $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat
  local.tee $2
  i32.store
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Y
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat
  local.tee $2
  i32.store
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Y
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat
  local.tee $2
  i32.store
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Y
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat
  local.tee $2
  i32.store
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Z
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat
  local.tee $1
  i32.store
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Z
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#rot90Z
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $assembly/VoxelSpace/VoxelSpace#getXAxisSpins
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $1
  local.get $0
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/SomaSolution/SomaSolution#getRotations (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<assembly/SomaSolution/SomaSolution>#constructor
  local.tee $6
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $2
  i32.store offset=4
  local.get $2
  i32.load offset=12
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $6
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 1952
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load offset=12
  local.tee $3
  i32.const 13
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $2
  i32.store
  local.get $2
  i32.load offset=4
  local.set $9
  loop $for-loop|0
   local.get $4
   local.get $3
   local.get $1
   i32.load offset=12
   local.tee $5
   local.get $3
   local.get $5
   i32.lt_s
   select
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.const 2
    i32.shl
    local.tee $10
    local.get $1
    i32.load offset=4
    i32.add
    i32.load
    local.tee $5
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $5
    local.get $4
    local.get $1
    i32.const 1952
    i32.load
    call_indirect $0 (type $i32_i32_i32_=>_i32)
    local.tee $5
    i32.store offset=8
    local.get $9
    local.get $10
    i32.add
    local.get $5
    i32.store
    local.get $2
    local.get $5
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=12
  loop $for-loop|00
   local.get $2
   i32.const 0
   call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $7
   local.get $1
   i32.load offset=12
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=4
    local.get $0
    i32.load offset=8
    local.get $0
    i32.load offset=12
    call $assembly/SomaSolution/SomaSolution#constructor
    local.tee $4
    i32.store offset=16
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     local.get $2
     i32.load offset=12
     i32.lt_s
     if
      local.get $2
      local.get $1
      call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
      local.set $3
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.store offset=8
      local.get $3
      local.get $7
      call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
      local.set $3
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.store offset=8
      local.get $4
      local.get $3
      call $assembly/SomaSolution/SomaSolution#addSpace
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $6
    local.get $4
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
    local.get $7
    i32.const 1
    i32.add
    local.set $7
    br $for-loop|00
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $6
 )
 (func $assembly/SomaSolution/SomaSolution.filterUnique (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<assembly/SomaSolution/SomaSolution>#constructor
  local.tee $3
  i32.store
  local.get $0
  i32.load offset=12
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   return
  end
  local.get $0
  i32.const 0
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $3
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
  loop $for-loop|0
   local.get $4
   local.get $0
   i32.load offset=12
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $4
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    local.get $1
    call $assembly/SomaSolution/SomaSolution#getRotations
    local.tee $9
    i32.store offset=12
    i32.const 0
    local.set $1
    i32.const 0
    local.set $5
    loop $for-loop|1
     local.get $5
     local.get $9
     i32.load offset=12
     i32.lt_s
     if
      local.get $3
      i32.load offset=12
      local.set $11
      i32.const 0
      local.set $6
      loop $for-loop|2
       local.get $6
       local.get $11
       i32.lt_s
       if
        local.get $9
        local.get $5
        call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
        local.set $8
        global.get $~lib/memory/__stack_pointer
        local.get $8
        i32.store offset=8
        local.get $3
        local.get $6
        call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
        local.set $10
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store offset=4
        i32.const 1
        local.get $1
        block $__inlined_func$assembly/SomaSolution/SomaSolution#matches (result i32)
         i32.const 0
         local.set $2
         global.get $~lib/memory/__stack_pointer
         i32.const 12
         i32.sub
         global.set $~lib/memory/__stack_pointer
         call $~stack_check
         global.get $~lib/memory/__stack_pointer
         i64.const 0
         i64.store
         global.get $~lib/memory/__stack_pointer
         i32.const 0
         i32.store offset=8
         loop $for-loop|00
          global.get $~lib/memory/__stack_pointer
          local.get $8
          i32.load
          local.tee $1
          i32.store
          local.get $2
          local.get $1
          i32.load offset=12
          i32.lt_s
          if
           global.get $~lib/memory/__stack_pointer
           local.get $8
           i32.load
           local.tee $1
           i32.store offset=8
           local.get $1
           local.get $2
           call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
           local.set $1
           global.get $~lib/memory/__stack_pointer
           local.get $1
           i32.store
           global.get $~lib/memory/__stack_pointer
           local.get $10
           i32.load
           local.tee $7
           i32.store offset=8
           local.get $7
           local.get $2
           call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
           local.set $7
           global.get $~lib/memory/__stack_pointer
           local.get $7
           i32.store offset=4
           local.get $1
           local.get $7
           call $assembly/VoxelSpace/VoxelSpace#matches
           i32.eqz
           if
            global.get $~lib/memory/__stack_pointer
            i32.const 12
            i32.add
            global.set $~lib/memory/__stack_pointer
            i32.const 0
            br $__inlined_func$assembly/SomaSolution/SomaSolution#matches
           end
           local.get $2
           i32.const 1
           i32.add
           local.set $2
           br $for-loop|00
          end
         end
         global.get $~lib/memory/__stack_pointer
         i32.const 12
         i32.add
         global.set $~lib/memory/__stack_pointer
         i32.const 1
        end
        select
        local.set $1
        local.get $6
        i32.const 1
        i32.add
        local.set $6
        br $for-loop|2
       end
      end
      local.get $5
      i32.const 1
      i32.add
      local.set $5
      br $for-loop|1
     end
    end
    local.get $1
    i32.eqz
    if
     local.get $0
     local.get $4
     call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     local.get $3
     local.get $1
     call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $assembly/SomaSolver/SomaSolver#solve (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=16
  local.get $1
  i32.load offset=12
  i32.eqz
  if
   i32.const 1552
   i32.const 1696
   i32.const 19
   i32.const 13
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=16
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=16
  local.tee $3
  i32.store offset=4
  local.get $2
  local.get $3
  i32.load offset=12
  call $~lib/array/Array<assembly/SomaSolution/SomaSolution>#splice
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<~lib/array/Array<assembly/VoxelSpace/VoxelSpace>>#constructor
  local.tee $6
  i32.store offset=8
  i32.const 1
  local.set $2
  loop $for-loop|0
   local.get $2
   local.get $1
   i32.load offset=12
   i32.lt_s
   if
    local.get $1
    local.get $2
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    local.get $0
    i32.load offset=4
    local.set $8
    local.get $0
    i32.load offset=8
    local.set $9
    local.get $0
    i32.load offset=12
    local.set $10
    i32.const 0
    local.set $3
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $4
    call $assembly/VoxelSpace/VoxelSpace#getUniqueRotations
    local.tee $7
    i32.store
    global.get $~lib/memory/__stack_pointer
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#constructor
    local.tee $4
    i32.store offset=4
    loop $for-loop|00
     local.get $3
     local.get $7
     i32.load offset=12
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $7
      local.get $3
      call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
      local.set $5
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=8
      local.get $5
      local.get $8
      local.get $9
      local.get $10
      call $assembly/VoxelSpace/VoxelSpace#getAllPositionsInPrism
      local.set $5
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=8
      local.get $4
      local.get $5
      call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat
      local.tee $4
      i32.store offset=4
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|00
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    local.get $6
    local.get $4
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<~lib/array/Array<assembly/VoxelSpace/VoxelSpace>>#constructor
  local.tee $2
  i32.store offset=12
  local.get $1
  i32.const 0
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load offset=8
  local.get $0
  i32.load offset=12
  call $assembly/VoxelSpace/VoxelSpace#getAllPositionsInPrism
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $2
  local.get $1
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
  global.get $~lib/memory/__stack_pointer
  local.get $2
  local.get $6
  call $~lib/array/Array<~lib/array/Array<assembly/VoxelSpace/VoxelSpace>>#concat
  local.tee $2
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $3
  i32.store offset=4
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load offset=8
  local.get $0
  i32.load offset=12
  call $assembly/SomaSolution/SomaSolution#constructor
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=16
  local.get $0
  local.get $3
  local.get $2
  local.get $1
  i32.const 0
  call $assembly/SomaSolver/SomaSolver#backtrackSolve
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=16
  local.tee $1
  i32.store
  local.get $0
  local.get $1
  call $assembly/SomaSolution/SomaSolution.filterUnique
  call $assembly/SomaSolver/SomaSolver#set:solutions
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/index/solve (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i64)
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=24
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.const 6
  call $~lib/rt/itcms/__new
  local.tee $4
  i32.store
  local.get $4
  i32.const 0
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $4
  i32.const 0
  i32.store offset=4
  local.get $4
  i32.const 0
  i32.store offset=8
  local.get $4
  i32.const 0
  i32.store offset=12
  local.get $4
  call $~lib/array/Array<assembly/SomaSolution/SomaSolution>#constructor
  call $assembly/SomaSolver/SomaSolver#set:solutions
  local.get $4
  local.get $1
  i32.store offset=4
  local.get $4
  local.get $2
  i32.store offset=8
  local.get $4
  local.get $3
  i32.store offset=12
  local.get $4
  i32.const 0
  local.get $1
  local.get $2
  local.get $3
  i64.const 0
  i32.const 0
  call $assembly/VoxelSpace/VoxelSpace#constructor
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
  i32.store
  global.get $~lib/memory/__stack_pointer
  call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#constructor
  local.tee $6
  i32.store offset=4
  loop $for-loop|0
   local.get $5
   local.get $0
   i32.load offset=12
   i32.lt_s
   if
    local.get $5
    local.get $0
    i32.load offset=12
    i32.ge_u
    if
     i32.const 1248
     i32.const 1504
     i32.const 99
     i32.const 42
     call $~lib/builtins/abort
     unreachable
    end
    local.get $5
    local.get $1
    local.get $2
    local.get $3
    local.get $0
    i32.load offset=4
    local.get $5
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i32.const 1
    call $assembly/VoxelSpace/VoxelSpace#constructor
    local.set $8
    global.get $~lib/memory/__stack_pointer
    local.get $8
    i32.store offset=8
    local.get $6
    local.get $8
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  local.get $4
  local.get $6
  call $assembly/SomaSolver/SomaSolver#solve
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.load offset=16
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.load offset=16
  local.tee $2
  i32.store offset=4
  local.get $1
  local.get $2
  i32.load offset=12
  call $~lib/array/Array<assembly/SomaSolution/SomaSolution>#slice
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  local.get $1
  i32.const 0
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store offset=4
  local.get $0
  i32.const 32
  call $~lib/memory/memory.fill
  local.get $1
  local.get $0
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $1
  local.get $0
  i32.store offset=4
  local.get $1
  i32.const 32
  i32.store offset=8
  local.get $1
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=16
  loop $for-loop|1
   local.get $7
   local.get $2
   i32.load offset=12
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    local.get $7
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=20
    local.get $0
    i32.load
    local.tee $3
    i32.store offset=24
    local.get $3
    i32.load offset=12
    local.set $4
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.const 4
    call $~lib/rt/itcms/__new
    local.tee $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    local.get $0
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.const 2
     call $~lib/rt/itcms/__new
     local.tee $0
     i32.store
    end
    local.get $0
    i32.const 0
    call $assembly/SomaSolver/SomaSolver#set:solutionCube
    local.get $0
    i32.const 0
    i32.store offset=4
    local.get $0
    i32.const 0
    i32.store offset=8
    local.get $4
    i32.const 134217727
    i32.gt_u
    if
     i32.const 1456
     i32.const 1984
     i32.const 18
     i32.const 57
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.const 3
    i32.shl
    local.tee $5
    i32.const 0
    call $~lib/rt/itcms/__new
    local.tee $4
    i32.store offset=4
    local.get $4
    local.get $5
    call $~lib/memory/memory.fill
    local.get $0
    local.get $4
    call $assembly/SomaSolver/SomaSolver#set:solutionCube
    local.get $0
    local.get $4
    i32.store offset=4
    local.get $0
    local.get $5
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $1
    local.get $0
    call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
    i32.const 0
    local.set $0
    loop $for-loop|2
     local.get $0
     local.get $3
     i32.load offset=12
     i32.lt_s
     if
      local.get $1
      local.get $7
      call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
      local.set $4
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=20
      local.get $3
      local.get $0
      call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get
      local.set $5
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=8
      local.get $5
      i64.load offset=8
      local.set $9
      local.get $0
      local.get $4
      i32.load offset=8
      i32.const 3
      i32.shr_u
      i32.ge_u
      if
       i32.const 1248
       i32.const 2048
       i32.const 980
       i32.const 64
       call $~lib/builtins/abort
       unreachable
      end
      local.get $4
      i32.load offset=4
      local.get $0
      i32.const 3
      i32.shl
      i32.add
      local.get $9
      i64.store
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|2
     end
    end
    local.get $7
    i32.const 1
    i32.add
    local.set $7
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/VoxelSpace/VoxelSpace#getExtrema (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=20
  local.set $3
  local.get $0
  i32.load offset=24
  local.set $5
  local.get $0
  i32.load offset=28
  local.set $6
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.const 11
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  local.get $5
  i32.store offset=12
  local.get $1
  i32.const 0
  i32.store offset=16
  local.get $1
  local.get $6
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  loop $for-loop|0
   local.get $4
   local.get $0
   i32.load offset=20
   i32.lt_s
   if
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     local.get $0
     i32.load offset=24
     i32.lt_s
     if
      i32.const 0
      local.set $3
      loop $for-loop|2
       local.get $3
       local.get $0
       i32.load offset=28
       i32.lt_s
       if
        local.get $0
        local.get $4
        local.get $2
        local.get $3
        call $assembly/VoxelSpace/VoxelSpace#at
        if
         local.get $1
         local.get $1
         i32.load
         f64.convert_i32_s
         local.get $4
         f64.convert_i32_s
         f64.max
         i32.trunc_f64_s
         i32.store
         local.get $1
         local.get $1
         i32.load offset=4
         f64.convert_i32_s
         local.get $4
         f64.convert_i32_s
         f64.min
         i32.trunc_f64_s
         i32.store offset=4
         local.get $1
         local.get $1
         i32.load offset=8
         f64.convert_i32_s
         local.get $2
         f64.convert_i32_s
         f64.max
         i32.trunc_f64_s
         i32.store offset=8
         local.get $1
         local.get $1
         i32.load offset=12
         f64.convert_i32_s
         local.get $2
         f64.convert_i32_s
         f64.min
         i32.trunc_f64_s
         i32.store offset=12
         local.get $1
         local.get $1
         i32.load offset=16
         f64.convert_i32_s
         local.get $3
         f64.convert_i32_s
         f64.max
         i32.trunc_f64_s
         i32.store offset=16
         local.get $1
         local.get $1
         i32.load offset=20
         f64.convert_i32_s
         local.get $3
         f64.convert_i32_s
         f64.min
         i32.trunc_f64_s
         i32.store offset=20
        end
        local.get $3
        i32.const 1
        i32.add
        local.set $3
        br $for-loop|2
       end
      end
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/VoxelSpace/VoxelSpace#constructor (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i64) (param $5 i32) (result i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 7
  call $~lib/rt/itcms/__new
  local.tee $6
  i32.store
  local.get $6
  i32.const 0
  i32.store
  local.get $6
  i64.const 0
  i64.store offset=8
  local.get $6
  i32.const 0
  i32.store offset=16
  local.get $6
  i32.const 0
  i32.store offset=20
  local.get $6
  i32.const 0
  i32.store offset=24
  local.get $6
  i32.const 0
  i32.store offset=28
  local.get $6
  local.get $0
  i32.store offset=16
  local.get $6
  local.get $3
  local.get $1
  local.get $2
  i32.mul
  i32.mul
  i32.store
  local.get $6
  local.get $1
  i32.store offset=20
  local.get $6
  local.get $2
  i32.store offset=24
  local.get $6
  local.get $3
  i32.store offset=28
  local.get $6
  local.get $4
  i64.store offset=8
  local.get $5
  if
   local.get $6
   call $assembly/VoxelSpace/VoxelSpace#cullEmptySpace
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $6
 )
 (func $~lib/array/Array<assembly/SomaSolution/SomaSolution>#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 10
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  local.get $1
  i32.const 32
  call $~lib/memory/memory.fill
  local.get $0
  local.get $1
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 32
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 9
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  local.get $1
  i32.const 32
  call $~lib/memory/memory.fill
  local.get $0
  local.get $1
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 32
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.shl
  local.tee $4
  i32.const 0
  call $~lib/rt/itcms/__new
  local.set $3
  local.get $2
  if
   local.get $3
   local.get $2
   local.get $4
   call $~lib/memory/memory.copy
  end
  local.get $3
  i32.store
  i32.const 16
  local.get $1
  call $~lib/rt/itcms/__new
  local.tee $1
  local.get $3
  i32.store
  local.get $1
  local.get $3
  i32.const 0
  call $~lib/rt/itcms/__link
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $4
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/array/Array<assembly/SomaSolution/SomaSolution>#splice (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 0
  local.get $0
  i32.load offset=12
  local.tee $3
  local.get $3
  i32.const 0
  i32.gt_s
  select
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $1
  local.get $3
  local.get $2
  i32.sub
  local.tee $4
  local.get $1
  local.get $4
  i32.lt_s
  select
  local.tee $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.gt_s
  select
  local.tee $1
  i32.const 10
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  local.get $4
  i32.load offset=4
  local.get $0
  i32.load offset=4
  local.tee $4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  local.tee $5
  local.get $1
  i32.const 2
  i32.shl
  call $~lib/memory/memory.copy
  local.get $3
  local.get $1
  local.get $2
  i32.add
  local.tee $2
  i32.ne
  if
   local.get $5
   local.get $4
   local.get $2
   i32.const 2
   i32.shl
   i32.add
   local.get $3
   local.get $2
   i32.sub
   i32.const 2
   i32.shl
   call $~lib/memory/memory.copy
  end
  local.get $0
  local.get $3
  local.get $1
  i32.sub
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<~lib/array/Array<assembly/VoxelSpace/VoxelSpace>>#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 13
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  local.get $1
  i32.const 32
  call $~lib/memory/memory.fill
  local.get $0
  local.get $1
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 32
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   i32.const 1248
   i32.const 1504
   i32.const 99
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store
  local.get $0
  i32.eqz
  if
   i32.const 1760
   i32.const 1504
   i32.const 103
   i32.const 40
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/VoxelSpace/VoxelSpace#getAllPositionsInPrism (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 9
  i32.const 1888
  call $~lib/rt/__newArray
  local.tee $10
  i32.store
  local.get $1
  local.get $0
  i32.load offset=20
  i32.lt_s
  if (result i32)
   i32.const 1
  else
   local.get $2
   local.get $0
   i32.load offset=24
   i32.lt_s
  end
  if (result i32)
   i32.const 1
  else
   local.get $3
   local.get $0
   i32.load offset=28
   i32.lt_s
  end
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $10
   return
  end
  loop $for-loop|0
   local.get $11
   local.get $1
   local.get $0
   i32.load offset=20
   i32.sub
   i32.const 1
   i32.add
   i32.lt_s
   if
    i32.const 0
    local.set $8
    loop $for-loop|1
     local.get $8
     local.get $2
     local.get $0
     i32.load offset=24
     i32.sub
     i32.const 1
     i32.add
     i32.lt_s
     if
      i32.const 0
      local.set $9
      loop $for-loop|2
       local.get $9
       local.get $3
       local.get $0
       i32.load offset=28
       i32.sub
       i32.const 1
       i32.add
       i32.lt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.load offset=16
        local.get $1
        local.get $2
        local.get $3
        i64.const 0
        i32.const 0
        call $assembly/VoxelSpace/VoxelSpace#constructor
        local.tee $4
        i32.store offset=4
        i32.const 0
        local.set $5
        loop $for-loop|3
         local.get $5
         local.get $0
         i32.load offset=20
         i32.lt_s
         if
          i32.const 0
          local.set $6
          loop $for-loop|4
           local.get $6
           local.get $0
           i32.load offset=24
           i32.lt_s
           if
            i32.const 0
            local.set $7
            loop $for-loop|5
             local.get $7
             local.get $0
             i32.load offset=28
             i32.lt_s
             if
              local.get $0
              local.get $5
              local.get $6
              local.get $7
              call $assembly/VoxelSpace/VoxelSpace#at
              i32.const 1
              local.get $7
              local.get $9
              i32.add
              local.get $5
              local.get $11
              i32.add
              local.get $4
              i32.load offset=24
              local.get $4
              i32.load offset=28
              i32.mul
              i32.mul
              local.get $4
              i32.load offset=28
              local.get $6
              local.get $8
              i32.add
              i32.mul
              i32.add
              i32.add
              i32.shl
              local.set $12
              if
               local.get $4
               local.get $4
               i64.load offset=8
               local.get $12
               i64.extend_i32_s
               i64.or
               i64.store offset=8
              else
               local.get $4
               local.get $4
               i64.load offset=8
               local.get $12
               i32.const -1
               i32.xor
               i64.extend_i32_s
               i64.and
               i64.store offset=8
              end
              local.get $7
              i32.const 1
              i32.add
              local.set $7
              br $for-loop|5
             end
            end
            local.get $6
            i32.const 1
            i32.add
            local.set $6
            br $for-loop|4
           end
          end
          local.get $5
          i32.const 1
          i32.add
          local.set $5
          br $for-loop|3
         end
        end
        local.get $10
        local.get $4
        call $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#push
        local.get $9
        i32.const 1
        i32.add
        local.set $9
        br $for-loop|2
       end
      end
      local.get $8
      i32.const 1
      i32.add
      local.set $8
      br $for-loop|1
     end
    end
    local.get $11
    i32.const 1
    i32.add
    local.set $11
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $10
 )
 (func $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.tee $2
  local.get $1
  i32.load offset=12
  i32.const 0
  local.get $1
  select
  local.tee $6
  i32.add
  local.tee $3
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1456
   i32.const 1504
   i32.const 229
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.const 9
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $3
  i32.store
  local.get $3
  i32.load offset=4
  local.set $5
  local.get $2
  i32.const 2
  i32.shl
  local.set $2
  local.get $0
  i32.load offset=4
  local.set $0
  loop $for-loop|0
   local.get $2
   local.get $4
   i32.gt_u
   if
    local.get $4
    local.get $5
    i32.add
    local.get $0
    local.get $4
    i32.add
    i32.load
    local.tee $7
    i32.store
    local.get $3
    local.get $7
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $4
    i32.const 4
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  local.get $2
  local.get $5
  i32.add
  local.set $4
  local.get $1
  i32.load offset=4
  local.set $1
  local.get $6
  i32.const 2
  i32.shl
  local.set $5
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   local.get $5
   i32.lt_u
   if
    local.get $0
    local.get $4
    i32.add
    local.get $0
    local.get $1
    i32.add
    i32.load
    local.tee $2
    i32.store
    local.get $3
    local.get $2
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/array/Array<~lib/array/Array<assembly/VoxelSpace/VoxelSpace>>#concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.tee $2
  local.get $1
  i32.load offset=12
  i32.const 0
  local.get $1
  select
  local.tee $6
  i32.add
  local.tee $3
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1456
   i32.const 1504
   i32.const 229
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.const 13
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $3
  i32.store
  local.get $3
  i32.load offset=4
  local.set $5
  local.get $2
  i32.const 2
  i32.shl
  local.set $2
  local.get $0
  i32.load offset=4
  local.set $0
  loop $for-loop|0
   local.get $2
   local.get $4
   i32.gt_u
   if
    local.get $4
    local.get $5
    i32.add
    local.get $0
    local.get $4
    i32.add
    i32.load
    local.tee $7
    i32.store
    local.get $3
    local.get $7
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $4
    i32.const 4
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  local.get $2
  local.get $5
  i32.add
  local.set $4
  local.get $1
  i32.load offset=4
  local.set $1
  local.get $6
  i32.const 2
  i32.shl
  local.set $5
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   local.get $5
   i32.lt_u
   if
    local.get $0
    local.get $4
    i32.add
    local.get $0
    local.get $1
    i32.add
    i32.load
    local.tee $2
    i32.store
    local.get $3
    local.get $2
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $assembly/SomaSolution/SomaSolution#constructor (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 8
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store
  local.get $3
  i32.const 0
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  local.get $3
  i32.const 0
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=8
  local.get $3
  i32.const 0
  i32.store offset=12
  local.get $3
  local.get $0
  i32.store offset=4
  local.get $3
  local.get $1
  i32.store offset=8
  local.get $3
  local.get $2
  i32.store offset=12
  local.get $3
  i32.const 0
  i32.const 9
  i32.const 1920
  call $~lib/rt/__newArray
  call $assembly/SomaSolver/SomaSolver#set:solutionCube
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/array/Array<assembly/VoxelSpace/VoxelSpace>#slice (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 0
  local.get $0
  i32.load offset=12
  local.tee $2
  local.get $2
  i32.const 0
  i32.gt_s
  select
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $1
   local.get $2
   i32.add
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.gt_s
   select
  else
   local.get $1
   local.get $2
   local.get $1
   local.get $2
   i32.lt_s
   select
  end
  local.get $3
  i32.sub
  local.tee $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.gt_s
  select
  local.tee $2
  i32.const 9
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store
  local.get $1
  i32.load offset=4
  local.set $4
  local.get $0
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  local.set $3
  i32.const 0
  local.set $0
  local.get $2
  i32.const 2
  i32.shl
  local.set $2
  loop $while-continue|0
   local.get $0
   local.get $2
   i32.lt_u
   if
    local.get $0
    local.get $4
    i32.add
    local.get $0
    local.get $3
    i32.add
    i32.load
    local.tee $5
    i32.store
    local.get $1
    local.get $5
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/array/Array<assembly/SomaSolution/SomaSolution>#slice (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 0
  local.get $0
  i32.load offset=12
  local.tee $2
  local.get $2
  i32.const 0
  i32.gt_s
  select
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $1
   local.get $2
   i32.add
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.gt_s
   select
  else
   local.get $1
   local.get $2
   local.get $1
   local.get $2
   i32.lt_s
   select
  end
  local.get $3
  i32.sub
  local.tee $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.gt_s
  select
  local.tee $2
  i32.const 10
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store
  local.get $1
  i32.load offset=4
  local.set $4
  local.get $0
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  local.set $3
  i32.const 0
  local.set $0
  local.get $2
  i32.const 2
  i32.shl
  local.set $2
  loop $while-continue|0
   local.get $0
   local.get $2
   i32.lt_u
   if
    local.get $0
    local.get $4
    i32.add
    local.get $0
    local.get $3
    i32.add
    i32.load
    local.tee $5
    i32.store
    local.get $1
    local.get $5
    i32.const 1
    call $~lib/rt/itcms/__link
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:assembly/index/solve (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $assembly/index/solve
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 ;; custom section "as-bind_bindings", size 354, contents: "{\"typeIds\":{\"~lib/array/Array<~lib/typedarray/Int64Array>\":{\"id\":5,\"byteSize\":16},\"~lib/typedarray/Int64Array\":{\"id\":4,\"byteSize\":12},\"~lib/array/Array<i64>\":{\"id\":3,\"byteSize\":16}},\"importedFunctions\":{},\"exportedFunctions\":{\"solve\":{\"returnType\":\"~lib/array/Array<~lib/typedarray/Int64Array>\",\"parameters\":[\"~lib/array/Array<i64>\",\"i32\",\"i32\",\"i32\"]}}}"
)
